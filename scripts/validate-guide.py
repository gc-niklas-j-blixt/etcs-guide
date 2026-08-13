import re
from pathlib import Path


# =========================================================
# Grundinställningar
# =========================================================

# Projektets rotmapp.
# validate-guide.py ligger i /scripts, därför går vi upp en nivå.
project_root = Path(__file__).resolve().parent.parent

# Nuvarande huvudfil med guideinnehåll
main_guide_path = project_root / "js" / "guide.js"

# Här kommer vi framöver lägga uppdelade delar av guiden
data_dir = project_root / "data"


# =========================================================
# Hitta guidefiler
# =========================================================

guide_files = []

# Lägg till nuvarande guide.js om den finns
if main_guide_path.exists():
    guide_files.append(main_guide_path)

# Lägg till alla framtida .js-filer från data/
if data_dir.exists():
    guide_files.extend(sorted(data_dir.glob("*.js")))

if not guide_files:
    print("ETCS Första Hjälpen – guidekontroll")
    print("-----------------------------------")
    print("FEL: Inga guidefiler hittades.")
    raise SystemExit(1)


# =========================================================
# Läs alla guidefiler
# =========================================================

guide_parts = []

for guide_file in guide_files:
    try:
        text = guide_file.read_text(encoding="utf-8")
        guide_parts.append(text)
    except Exception as error:
        print("ETCS Första Hjälpen – guidekontroll")
        print("-----------------------------------")
        print(f"FEL: Kunde inte läsa {guide_file}")
        print(error)
        raise SystemExit(1)

# Slå ihop innehållet virtuellt för validatorns kontroller.
# Originalfilerna ändras inte.
guide_text = "\n".join(guide_parts)


# =========================================================
# Grundinformation
# =========================================================

print("ETCS Första Hjälpen – guidekontroll")
print("-----------------------------------")
print(f"Guidefiler hittade: {len(guide_files)}")

for guide_file in guide_files:
    relative_path = guide_file.relative_to(project_root)
    print(f"  - {relative_path}")

print(f"Total storlek: {len(guide_text)} tecken")
print("OK: Alla guidefiler kunde läsas.")


# =========================================================
# Hitta noder
# =========================================================

# Hittar exempelvis:
#
# start: {
# dmi_brake_test: {
# warn_traction_cutoff: {
#
# Indraget får variera.
node_pattern = re.compile(
    r"^\s*([A-Za-z0-9_]+)\s*:\s*{",
    re.MULTILINE
)

node_matches = node_pattern.findall(guide_text)

# Set används vid jämförelser.
nodes = set(node_matches)


# =========================================================
# Kontroll 0 – dubbla nod-ID
# =========================================================

duplicate_nodes = sorted(
    {
        node
        for node in node_matches
        if node_matches.count(node) > 1
    }
)

print()
print("Kontroll av nod-ID")
print("------------------")

if duplicate_nodes:
    print(f"FEL: {len(duplicate_nodes)} nod-ID förekommer flera gånger:")

    for node in duplicate_nodes:
        print(f"  - {node}")
else:
    print("OK: Alla nod-ID är unika.")


# =========================================================
# Hitta länkar mellan noder
# =========================================================

# Hittar exempelvis:
#
# ["Fortsätt", "next_step"]
# ["DMI visar menyn 'Föraridentitet'", "dmi_driver_id"]
#
# Klarar apostrofer inne i dubbelciterad knapptext
# och dubbla citattecken inne i enkelciterad knapptext.
choice_pattern = re.compile(
    r'\[\s*(?:"[^"]*"|\'[^\']*\')'
    r'\s*,\s*["\']([A-Za-z0-9_]+)["\']\s*\]'
)

targets = choice_pattern.findall(guide_text)


print()
print("Struktur")
print("---------")
print(f"Noder hittade: {len(nodes)}")
print(f"Länkar mellan steg hittade: {len(targets)}")


# =========================================================
# Kontroll 1 – länkar till noder som saknas
# =========================================================

missing_targets = sorted(set(targets) - nodes)

print()
print("Länkkontroll")
print("------------")

if missing_targets:
    print(f"FEL: {len(missing_targets)} länkmål saknas:")

    for target in missing_targets:
        print(f"  - {target}")
else:
    print("OK: Alla länkar pekar på befintliga noder.")


# =========================================================
# Kontroll 2 – tomma länkmål
# =========================================================

# Hittar exempelvis:
#
# ["Fortsätt", ""]
#
# vilket annars ger en knapp som inte leder någonstans.
empty_target_pattern = re.compile(
    r'\[\s*(?:"([^"]*)"|\'([^\']*)\')'
    r'\s*,\s*["\']\s*["\']\s*\]'
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
# Bygg graf över guiden
# =========================================================

graph = {node: [] for node in nodes}

current_node = None

for line in guide_text.splitlines():

    # Kontrollera om raden börjar en ny nod
    node_match = re.match(
        r"^\s*([A-Za-z0-9_]+)\s*:\s*{",
        line
    )

    if node_match:
        current_node = node_match.group(1)

    # Kontrollera om raden innehåller ett choice med länkmål
    choice_match = re.search(
        r'\[\s*(?:"[^"]*"|\'[^\']*\')'
        r'\s*,\s*["\']([A-Za-z0-9_]+)["\']\s*\]',
        line
    )

    if current_node and choice_match:
        target = choice_match.group(1)
        graph.setdefault(current_node, []).append(target)


# =========================================================
# Kontroll 3 – noder som inte går att nå från start
# =========================================================

reachable = set()

if "start" in nodes:
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

else:
    unreachable = sorted(nodes)


print()
print("Kontroll av onåbara noder")
print("-------------------------")

if "start" not in nodes:
    print("FEL: Startnoden 'start' saknas.")

elif unreachable:
    print(
        f"VARNING: {len(unreachable)} noder går inte att nå från 'start':"
    )

    for node in unreachable:
        print(f"  - {node}")

else:
    print("OK: Alla noder går att nå från 'start'.")


# =========================================================
# Kontroll 4 – bilder som saknas
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

# Ta bort eventuella dubletter
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
    len(duplicate_nodes)
    + len(missing_targets)
    + len(empty_targets)
    + len(missing_images)
)

if "start" not in nodes:
    error_count += 1

warning_count = len(unreachable) if "start" in nodes else 0


print()
print("===================================")
print("SAMMANFATTNING")
print("===================================")
print(f"Guidefiler: {len(guide_files)}")
print(f"Noder:      {len(nodes)}")
print(f"Länkar:     {len(targets)}")
print(f"Bilder:     {len(image_paths)}")
print(f"Fel:        {error_count}")
print(f"Varningar:  {warning_count}")
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


# =========================================================
# Exit-kod
# =========================================================

# Exit code 1 gör det möjligt att senare använda validatorn
# automatiskt i exempelvis release-script eller GitHub Actions.
if error_count > 0:
    raise SystemExit(1)

raise SystemExit(0)