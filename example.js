const { colorize } = require('./dist');
const pkg = require('./package.json');

console.log(colorize(pkg));
