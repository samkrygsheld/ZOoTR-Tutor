import os
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

# file = ET.parse('./public/images/maps/map-field.svg')
# root = file.getroot()
# ns = {'':'http://www.w3.org/2000/svg', 'inkscape': 'http://www.inkscape.org/namespaces/inkscape'}

# for ele in root.findall('.//*[@inkscape:label]', ns):
#   label = ele.get('{'+ns['inkscape']+'}label')
#   ele.set('id', label)
# file.write('./public/images/maps/map-field.svg', default_namespace='http://www.w3.org/2000/svg')

path = './public/images/maps'
for filename in os.listdir(path):
  if not filename.endswith('.svg'):
    continue
  fPath = os.path.join(path, filename)

  with open(fPath, 'r+') as file:
    fileContents = file.read().replace(' xmlns:svg="http://www.w3.org/2000/svg"', '')
    soup = BeautifulSoup(fileContents, 'xml')
    del soup.svg['xmlns:svg']
    for ele in soup.find_all(attrs={'inkscape:label':True}):
      ele['id'] = ele['inkscape:label'].replace(' ', '_')
      print(ele['id'])
    file.seek(0)
    file.write(soup.prettify())
    file.truncate()
