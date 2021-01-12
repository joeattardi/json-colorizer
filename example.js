const colorize = require('./src/lib');
const pkg = require('./package.json');

console.log(colorize(pkg, {
  colors: {
    STRING_LITERAL: '#FF0000'
  },
  pretty: 2 // pretty: true
}));
