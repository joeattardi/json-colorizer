const { colorize, color } = require('./dist');
const pkg = require('./package.json');

console.log(colorize(pkg, {
  theme: {
    StringLiteral: color.red
  }
}));