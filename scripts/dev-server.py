from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
import webbrowser


PORT = 5500

# Projektets rotmapp
project_root = Path(__file__).resolve().parent.parent

# Byt arbetsmapp till projektets rot
os.chdir(project_root)

url = f"http://127.0.0.1:{PORT}/"

print("ETCS Första Hjälpen – utvecklingsserver")
print("---------------------------------------")
print(f"Projekt: {project_root}")
print(f"Adress:  {url}")
print()
print("Tryck Ctrl+C i terminalen för att stoppa servern.")
print()

server = ThreadingHTTPServer(
    ("127.0.0.1", PORT),
    SimpleHTTPRequestHandler
)

# Öppna sidan automatiskt i standardwebbläsaren
webbrowser.open(url)

try:
    server.serve_forever()
except KeyboardInterrupt:
    print()
    print("Utvecklingsservern stoppad.")
finally:
    server.server_close()
