const fs = require('fs');
const path = require('path');
const dir = 'd:/help/webtoon-app/src/data';

let c1 = fs.readFileSync(path.join(dir, 'chapter1.ts'), 'utf8');
['1A', '1B', '1C', '1D'].forEach(id => {
  c1 = c1.replace(new RegExp("id: '" + id + "', imageUrl: '(.*?)', bgmUrl: null"), "id: '" + id + "', imageUrl: '$1', bgmUrl: '/assets/chapters/SFX/sounds_1A_til_1D.MP3'");
});
c1 = c1.replace("id: '1C', imageUrl: '/assets/chapters/CHAPTER 1/1C.png', bgmUrl: '/assets/chapters/SFX/sounds_1A_til_1D.MP3', sfxUrl: null", "id: '1C', imageUrl: '/assets/chapters/CHAPTER 1/1C.png', bgmUrl: '/assets/chapters/SFX/sounds_1A_til_1D.MP3', sfxUrl: '/assets/chapters/SFX/sounds_1C.MP3'");
fs.writeFileSync(path.join(dir, 'chapter1.ts'), c1);

let c3 = fs.readFileSync(path.join(dir, 'chapter3.ts'), 'utf8');
['3A','3B','3C','3D','3E','3F','3G','3H','3I','3J','3K','3L','3M','3N','3O','3P','3Q','3R'].forEach(id => {
  c3 = c3.replace(new RegExp("id: '" + id + "', imageUrl: '(.*?)', bgmUrl: null"), "id: '" + id + "', imageUrl: '$1', bgmUrl: '/assets/chapters/SFX/sounds_3A_til_3R.mp3'");
});
fs.writeFileSync(path.join(dir, 'chapter3.ts'), c3);

let c6 = fs.readFileSync(path.join(dir, 'chapter6.ts'), 'utf8');
['6Z2','6Z3','6Z4','6Z5','6Z6'].forEach(id => {
  c6 = c6.replace(new RegExp("id: '" + id + "', imageUrl: '(.*?)', bgmUrl: null"), "id: '" + id + "', imageUrl: '$1', bgmUrl: '/assets/chapters/SFX/sounds 6Z2_til_7I.mp3'");
});
fs.writeFileSync(path.join(dir, 'chapter6.ts'), c6);

let ep = fs.readFileSync(path.join(dir, 'epilogue.ts'), 'utf8');
['6Z2','6Z3','6Z4','6Z5','6Z6','7A','7B','7C','7D','7E','7F','7G','7H','7I'].forEach(id => {
  ep = ep.replace(new RegExp("id: '" + id + "', imageUrl: '(.*?)', bgmUrl: null"), "id: '" + id + "', imageUrl: '$1', bgmUrl: '/assets/chapters/SFX/sounds 6Z2_til_7I.mp3'");
});
fs.writeFileSync(path.join(dir, 'epilogue.ts'), ep);
