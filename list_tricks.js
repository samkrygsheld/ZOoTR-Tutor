const fs = require('fs');

const tricks = [];
for (const fileName of fs.readdirSync('public/js/data/logic')) {
  const fileContents = fs.readFileSync('public/js/data/logic/'+fileName).toString();
  const matches = fileContents.matchAll(/logic_[\w_]+\b/g);
  for (const match of matches) {
    tricks.push(match[0]);
  }
}
const uniqueTricks = new Set(tricks);
uniqueTricks.delete('logic_rules');
for (const trick of uniqueTricks) {
  console.log(trick+': false,');
}
