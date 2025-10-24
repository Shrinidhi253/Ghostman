import requests
import json
import re

global API_KEY
API_KEY = "FB9db2Fea1kRRPorWqCEsQ==b3Uti7t2V4F4eyUx"

def find_first_def(text):
    pattern = r"[^\d.\s]+?\D+"
    try:
        definition = re.findall(pattern, text)[0]
    except IndexError:
        definition = ""

    return definition



def find_definitions(filename):
    definitions  = {}

    with open(f"./dataset/{filename}.json", "r") as file:
        all_words = json.load(file)["words"]

        for word in all_words:
            if len(word) > 4:
                word_definitions = requests.get(
                    url = f"https://api.api-ninjas.com/v1/dictionary?word={word}",
                    headers = {"X-Api-Key" : API_KEY}
                ).json()["definition"]

                significant_def = find_first_def(word_definitions)

                definitions[word] = significant_def

    with open(f"./dataset/{filename}_defined.json", "w") as file:
        json.dump(definitions, file, indent = 4)

find_definitions("strange_words")