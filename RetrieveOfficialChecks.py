import requests

OoT_Randomizer_version = '@6.0.57'

# Can insert version number after OoT-Randomizer or empty string to retrieve most recent
base_link = 'https://cdn.jsdelivr.net/gh/TestRunnerSRL/OoT-Randomizer{}/data/World/{}.json'

locations = [
    'Bottom of the Well',
    'Deku Tree',
    'Dodongos Cavern',
    'Fire Temple',
    'Forest Temple',
    'Ganons Castle',
    'Gerudo Training Grounds',
    'Ice Cavern',
    'Jabu Jabus Belly',
    'Overworld',
    'Shadow Temple',
    'Spirit Temple',
    'Water Temple'
    ]

locations_json = []

for location in locations:
    location_request = requests.get(base_link.format(OoT_Randomizer_version, location.replace(' ', '%20')))
    if location_request.status_code != 200:
        raise ConnectionError('Expected code 200 while retrieving {}, but received {}'.format(location_request.url, location_request.status_code))
    locations_json.append(location_request.content)

logic_helpers = 'https://cdn.jsdelivr.net/gh/TestRunnerSRL/OoT-Randomizer{}/data/LogicHelpers.json'

logic_helpers_request = requests.get(logic_helpers.format(OoT_Randomizer_version))
if logic_helpers_request.status_code != 200:
    raise ConnectionError('Expected code 200 while retrieving {}, but received {}'.format(logic_helpers_request.url, logic_helpers_request.status_code))
logic_helpers_json = logic_helpers_request.content
