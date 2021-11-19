const colorette = require('colorette')

const defaultColors = {
  BRACE: 'greenBright',
  BRACKET: 'blueBright',
  COLON: 'gray',
  COMMA: 'gray',
  STRING_KEY: 'redBright',
  STRING_LITERAL: 'greenBright',
  NUMBER_LITERAL: 'yellow',
  BOOLEAN_LITERAL: 'cyan',
  NULL_LITERAL: 'white'
}

exports.colorize = function colorize(tokens, options = {}) {
  const colors = options.colors || {}

  return tokens.reduce((acc, token) => {
    const colorKey = colors[token.type] || defaultColors[token.type]
    const colorFn = colorKey && colorette[colorKey]

    return acc + (colorFn ? colorFn(token.value) : token.value)
  }, '')
}
