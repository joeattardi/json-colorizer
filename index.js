const colorize = require('./src/lib');
console.log(
  colorize(
    { foo: 'bar' },
    {
      colors: {
        STRING_LITERAL: '#FF0000'
      }
    }
  )
);
