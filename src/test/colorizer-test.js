const chai = require('chai')
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot')

chai.use(jestSnapshotPlugin())
const { expect } = chai
const { getTokens } = require('../lib/lexer')
const { colorize } = require('../lib/colorizer')
const customColors = {
  BRACE: 'white',
  BRACKET: 'white',
  COLON: 'white',
  COMMA: 'white',
  STRING_KEY: 'yellow',
  NULL_LITERAL: 'red',
  STRING_LITERAL: 'green',
  NUMBER_LITERAL: 'magentaBright',
  BOOLEAN_LITERAL: 'cyan'
}

const fixture = {
  foo: null,
  bar: { baz: true },
  number: 13,
  array: ['values']
}

describe('Colorizer', function () {
  it('does not throw an error when there is whitespace', function () {
    expect(() => colorize(getTokens(JSON.stringify(fixture, null, 2)))).to.not.throw()
  })

  it('colorizes with default options', function () {
    const tokens = getTokens(fixture)
    const result = colorize(tokens)

    expect(result).toMatchSnapshot()
  })

  it('colorizes with custom colors', function () {
    const tokens = getTokens(fixture)
    const result = colorize(tokens, { colors: customColors })

    expect(result).toMatchSnapshot()
  })

  it('colorizes with only specific overrides for colors', function () {
    const tokens = getTokens(fixture)
    const result = colorize(tokens, { colors: { NUMBER_LITERAL: 'red' } })

    expect(result).toMatchSnapshot()
  })
})
