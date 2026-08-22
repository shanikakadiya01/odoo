const fs = require('fs');
const path = require('path');

const apiPath = path.join(__dirname, 'src', 'services', 'api.js');
let content = fs.readFileSync(apiPath, 'utf8');

// The old cities started at city_mumbai_16 and ended before city_delhi_40
const startPattern = /    \{\s*"_id": "city_mumbai_16"/;
const endPattern = /    \{\s*"_id": "city_delhi_40"/;

const matchStart = content.match(startPattern);
const matchEnd = content.match(endPattern);

if (matchStart && matchEnd) {
  const startIndex = matchStart.index;
  const endIndex = matchEnd.index;
  const cleanedContent = content.slice(0, startIndex) + content.slice(endIndex);
  fs.writeFileSync(apiPath, cleanedContent);
  console.log('Cleaned up old duplicate cities successfully.');
} else {
  console.log('Could not find duplicates to clean, maybe they are already gone.');
}
