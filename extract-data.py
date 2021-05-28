import os
import sys
import stat
import shutil

def recursive_chmod(path, perm):
    for dirpath, _, filenames in os.walk(path):
        os.chmod(dirpath, perm)
        for filename in filenames:
            os.chmod(os.path.join(dirpath, filename), perm)

randoPath = 'ootrandomizer'
recursive_chmod(randoPath, stat.S_IWRITE)
shutil.rmtree(randoPath)
os.system('git clone -b v6.0 --single-branch https://github.com/TestRunnerSRL/OoT-Randomizer.git ' + randoPath)

sys.path.append(randoPath)

# Import settings
from SettingsList import setting_infos, get_setting_info, logic_tricks
import json
import types
class MyEncoder(json.JSONEncoder):
    def default(self, o):
        try:
            if isinstance(o.__dict__, types.MappingProxyType):
                return o.__name__
            else:
                return o.__dict__
        except:
            return json.JSONEncoder.default(self, o)

with open('assets/js/randomizer-data.json', 'w') as jsonFile:
    json.dump(setting_infos, jsonFile, cls=MyEncoder, indent=4)

# Import checks
from Utils import read_json
for file in os.scandir(os.path.join(randoPath, 'data', 'World')):
    jsonData = read_json(file.path)
    fileName =  file.name.lower().replace(' ', '_')
    with open(os.path.join('assets', 'js', 'data', 'checks', fileName), 'w') as jsonFile:
        json.dump(jsonData, jsonFile, indent=4)

# Import logic helpers
jsonData = read_json(os.path.join('ootrandomizer', 'data', 'LogicHelpers.json'))
with open(os.path.join('assets', 'js', 'data', 'logic_helpers.json'), 'w') as jsonFile:
    json.dump(jsonData, jsonFile, indent=4)
