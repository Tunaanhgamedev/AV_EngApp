const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, '..', 'client', 'src', 'app', 'games', 'page.tsx');
let c = fs.readFileSync(f, 'utf8');

const fixes = [
  // UMBRELLA - was group of friends photo
  ['photo-1528605248644-14dd04022da1', 'photo-1534483509719-8b42218cf905'],
  // SUN - was galaxy/space
  ['photo-1506318137071-a8e063b4bec0', 'photo-1532693322450-2cb5c511067d'],
  // BUTTERFLY - wrong subject
  ['photo-1506869640319-fe1a24fd76dc', 'photo-1452570053594-1b985d6ea890'],
  // COMPUTER - wrong subject
  ['photo-1547082299-de196ea013d6', 'photo-1496181133206-80ce9b88a853'],
  // TELEPHONE - 404 error
  ['photo-1520923642038-b4a53cb3a419', 'photo-1558618666-fcd25c85f82e'],
  // DESERT - was forest
  ['photo-1509316975850-ff9c5deb0cd9', 'photo-1509316785289-025f5b846b35'],
  // BALLOON - party balloons, hint says hot air balloon
  ['photo-1530103862676-de8c9debad1d', 'photo-1507608616759-54f48f0af0ee'],
  // HELICOPTER - wrong subject
  ['photo-1508614589041-895b88991e3e', 'photo-1534397860164-120c97f4db0b'],
  // STAR - blurry
  ['photo-1502134249126-9f3755a50d78', 'photo-1444703686981-a3abbc4d4fe3'],
  // CHEESE - was London photo
  ['photo-1486299267070-83823f5448dd', 'photo-1552767059-ce182ead6c1b'],
  // TELEVISION - wrong
  ['photo-1593305841991-05c297ba4575', 'photo-1593784991095-a205069470b6'],
  // SHIP - wrong
  ['photo-1505705694340-019e1e335916', 'photo-1504196606672-aef5c9cefc92'],
  // ICECREAM - wrong
  ['photo-1501443710935-77b61d318a09', 'photo-1497034825429-c343d7c6a68f'],
  // JUICE - wrong
  ['photo-1621506289937-a8e4df240d0b', 'photo-1534353473418-4cfa6c56fd38'],
  // ONION - wrong
  ['photo-1508747703725-719ae257c84a', 'photo-1587049693270-f10438b84ffc'],
];

let count = 0;
for (const [oldId, newId] of fixes) {
  if (c.includes(oldId)) {
    c = c.replaceAll(oldId, newId);
    count++;
  }
}

fs.writeFileSync(f, c, 'utf8');
console.log('Fixed ' + count + ' broken image URLs');
