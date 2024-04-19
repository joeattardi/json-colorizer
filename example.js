const fs = require('fs');
const { colorize } = require('./dist');
// const pkg = require('./package.json');

// console.log(colorize(pkg));

const json = fs.readFileSync('./large-file.json', 'utf8');

console.log(colorize(json));