const { resolve } = require('path');
const svgstore = require('svgstore');
const fs = require('fs');

const images = resolve(__dirname, 'images');
const svg = resolve(images, 'svg');

const svgoOptions = {
  copyAttrs: ['fill']
};
const sprite = svgstore(svgoOptions);

fs.readdirSync(svg).forEach(fileName => {
  sprite.add(fileName.split('.')[0], fs.readFileSync(`${svg}/${fileName}`));
});

fs.writeFileSync(`${images}/sprite.svg`, sprite);
