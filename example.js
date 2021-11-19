const colorize = require('./src/lib')
const pkg = require('./package.json')

console.log(
  colorize(
    { ...pkg, number: 13432423, boolean: true, null: null },
    {
      pretty: true
    }
  )
)
