import json
import os

default_locale = "en-gb"
cached_strings = {}

def refresh():
    print("Refreshing...")
    global cached_strings

    # Get the directory of the strings.py file
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Move one level up from the 'libs' folder to the project root
    project_root = os.path.dirname(base_dir)

    # Construct the path to the JSON file
    json_file_path = os.path.join(project_root, f"strings/{default_locale}.json")

    with open(json_file_path) as f:
        cached_strings = json.load(f)

def gettext(name):
    return cached_strings[name]

refresh()