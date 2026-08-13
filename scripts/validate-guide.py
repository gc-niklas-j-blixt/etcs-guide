import re
from pathlib import Path


# =========================================================
# Grundinställningar
# =========================================================

# Projektets rotmapp
project_root = Path(__file__).resolve().parent.parent

# Sökvägen till guide.js
guide_path = project_root / "js" / "guide.js"


# =========================================================
# Läs guide.js
# =========================================================

print("ETCS Första Hjälpen – guidekontroll")
print("-----------------------------------")

if not guide_path.exists():
    print(f"FEL: Hittar inte {guide_path}")
    raise SystemExit(1)

guide_text = guide_path.read_text(encoding="utf-8")

print(f"Guide hittad: {guide_path}")
print(f"Filstorlek: {len(guide_text)} tecken")
print("OK: guide.js kunde läsas.")


# =========================================================
# Hitta noder
# =========================================================

# Hittar noder som exempelvis:
#
# dmi_brake_test: {
# warn_traction_cutoff: {
#
# Indraget får variera.
node_pattern = re.compile(
    r"^\s*([A-Za-z0-9_]+)\s*:\s*{",
    re.MULTILINE
)

nodes = set(node_pattern.findall(guide_text))


# =========================================================
# Hitta länkar mellan noder
# =========================================================

# Hittar choices som exempelvis:
#
# ["Fortsätt", "next_step"]
# ["DMI visar menyn 'Föraridentitet'", "dmi_driver_id"]
#
# Klarar apostrofer inne i dubbelciterad text och tvärtom.
choice_pattern = re.compile(
    r'\[\s*(?:"[^"]*"|\'[^\']*\')\s*,\s*["\']([A-Za-z0-9_]+)["\']\s*\]'
)

targets = choice_pattern.findall(guide_text)


print()
print("Struktur")
print("---------")
print(f"Noder hittade: {len(nodes)}")
print(f"Länkar mellan steg hittade: {len(targets)}")


# =========================================================
# Kontroll 1 – länkar som pekar på noder som saknas
# =========================================================

missing_targets = sorted(set(targets) - nodes)

print()
print("Länkkontroll")
print("------------")

if missing_targets:
    print(f"FEL: {len(missing_targets)} länkmål saknas i guide.js:")

    for target in missing_targets:
        print(f"  - {target}")
else:
    print("OK: Alla länkar pekar på befintliga noder.")


# =========================================================
# Kontroll 2 – val som saknar länkmål
# =========================================================

# Hittar exempelvis:
#
# ["Fortsätt", ""]
#
# vilket annars skulle skapa en knapp som inte leder någonstans.
empty_target_pattern = re.compile(
    r'\[\s*(?:"([^"]*)"|\'([^\']*)\')\s*,\s*["\']\s*["\']\s*\]'
)

empty_target_matches = empty_target_pattern.findall(guide_text)

empty_targets = []

for double_quoted, single_quoted in empty_target_matches:
    label = double_quoted or single_quoted
    empty_targets.append(label)


print()
print("Kontroll av tomma länkmål")
print("-------------------------")

if empty_targets:
    print(f"FEL: {len(empty_targets)} val saknar länkmål:")

    for label in empty_targets:
        print(f"  - {label}")
else:
    print("OK: Inga val saknar länkmål.")


# =========================================================
# Kontroll 3 – bygg graf över guiden
# =========================================================

graph = {node: [] for node in nodes}

current_node = None

for line in guide_text.splitlines():

    # Kontrollera om raden börjar en ny nod.
    node_match = re.match(
        r"^\s*([A-Za-z0-9_]+)\s*:\s*{",
        line
    )

    if node_match:
        current_node = node_match.group(1)

    # Kontrollera om raden innehåller ett choice med länkmål.
    choice_match = re.search(
        r'\[\s*(?:"[^"]*"|\'[^\']*\')\s*,\s*["\']([A-Za-z0-9_]+)["\']\s*\]',
        line
    )

    if current_node and choice_match:
        target = choice_match.group(1)
        graph.setdefault(current_node, []).append(target)


# =========================================================
# Kontroll 4 – noder som inte går att nå från start
# =========================================================

reachable = set()
stack = ["start"]

while stack:
    node = stack.pop()

    if node in reachable:
        continue

    reachable.add(node)

    for target in graph.get(node, []):
        if target not in reachable:
            stack.append(target)

unreachable = sorted(nodes - reachable)


print()
print("Kontroll av onåbara noder")
print("-------------------------")

if "start" not in nodes:
    print("FEL: Startnoden 'start' saknas i guide.js.")

elif unreachable:
    print(
        f"VARNING: {len(unreachable)} noder går inte att nå från 'start':"
    )

    for node in unreachable:
        print(f"  - {node}")

else:
    print("OK: Alla noder går att nå från 'start'.")


# =========================================================
# Kontroll 5 – bilder som saknas
# =========================================================

# Hittar exempelvis:
#
# image: "assets/images/Föraridentitet.png"
#
image_pattern = re.compile(
    r'image\s*:\s*["\']([^"\']+)["\']'
)

image_paths = image_pattern.findall(guide_text)

missing_images = []

for image_path in image_paths:
    full_image_path = project_root / Path(image_path)

    if not full_image_path.exists():
        missing_images.append(image_path)

# Ta bort eventuella dubletter i fellistan
missing_images = sorted(set(missing_images))


print()
print("Kontroll av bilder")
print("------------------")

if missing_images:
    print(f"FEL: {len(missing_images)} bildfiler saknas:")

    for image in missing_images:
        print(f"  - {image}")
else:
    print(f"OK: Alla {len(image_paths)} refererade bilder finns.")


# =========================================================
# Sammanfattning
# =========================================================

error_count = (
    len(missing_targets)
    + len(empty_targets)
    + len(missing_images)
)

if "start" not in nodes:
    error_count += 1

warning_count = len(unreachable)


print()
print("===================================")
print("SAMMANFATTNING")
print("===================================")
print(f"Noder:     {len(nodes)}")
print(f"Länkar:    {len(targets)}")
print(f"Bilder:    {len(image_paths)}")
print(f"Fel:       {error_count}")
print(f"Varningar: {warning_count}")
print()

if error_count == 0 and warning_count == 0:
    print("RESULTAT: OK")
    print("Guidens struktur och resurser ser korrekta ut.")

elif error_count == 0:
    print("RESULTAT: OK MED VARNINGAR")
    print("Guiden innehåller inga direkta fel, men bör granskas.")

else:
    print("RESULTAT: FEL")
    print("Guiden innehåller fel som bör åtgärdas.")