const colorize = require('./src/lib');

const jsonString = JSON.stringify({ foo: 'bar' }, null, 2);

console.log(
  colorize(jsonString, {
    colors: {
      STRING_LITERAL: '#FF0000'
    }
  })
);
