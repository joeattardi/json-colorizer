const { expect } = require('chai')
const { getTokens } = require('../lib/lexer')

describe('Lexer', () => {
  it('tokenizes a basic JSON object', () => {
    const result = getTokens({
      foo: 'bar'
    })

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'BRACE', value: '}' }
    ])
  })

  it('tokenizes a basic JSON string', () => {
    const result = getTokens('{"foo":"bar"}')

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'BRACE', value: '}' }
    ])
  })

  it('tokenizes an array', () => {
    const result = getTokens(['foo', 'bar'])

    expect(result).to.deep.equal([
      { type: 'BRACKET', value: '[' },
      { type: 'STRING_LITERAL', value: '"foo"' },
      { type: 'COMMA', value: ',' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'BRACKET', value: ']' }
    ])
  })

  it('includes whitespace', () => {
    const result = getTokens('{\n  "foo": "bar"\n}')

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'WHITESPACE', value: '\n  ' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'WHITESPACE', value: '\n' },
      { type: 'BRACE', value: '}' }
    ])
  })

  it('tokenizes boolean values', () => {
    let result = getTokens('true')
    expect(result).to.deep.equal([{ type: 'BOOLEAN_LITERAL', value: 'true' }])

    result = getTokens('false')
    expect(result).to.deep.equal([{ type: 'BOOLEAN_LITERAL', value: 'false' }])
  })

  it('tokenizes integer values', () => {
    let result = getTokens('123')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '123' }])

    result = getTokens('-10')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '-10' }])
  })

  it('tokenizes a decimal number', () => {
    const result = getTokens('1.234')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '1.234' }])
  })

  it('tokenizes a scientific notation number', () => {
    let result = getTokens('12e5')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12e5' }])

    result = getTokens('12e+5')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12e+5' }])

    result = getTokens('12E-5')
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12E-5' }])
  })

  it('tokenizes null', () => {
    const result = getTokens('null')
    expect(result).to.deep.equal([{ type: 'NULL_LITERAL', value: 'null' }])
  })

  it('tokenizes a string literal with brace characters', () => {
    const result = getTokens('"{hello}"')
    expect(result).to.deep.equal([{ type: 'STRING_LITERAL', value: '"{hello}"' }])
  })

  it('tokenizes a string literal with bracket characters', () => {
    const result = getTokens('"[hello]"')
    expect(result).to.deep.equal([{ type: 'STRING_LITERAL', value: '"[hello]"' }])
  })

  it('tokenizes a string literal with an escaped quote', () => {
    const result = getTokens('"a\\"b"')
    expect(result).to.deep.equal([{ type: 'STRING_LITERAL', value: '"a\\"b"' }])
  })

  it('tokenizes a key-value pair with whitespace between the :', () => {
    const result = getTokens('"foo" : "bar"')
    expect(result).to.deep.equal([
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'COLON', value: ':' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'STRING_LITERAL', value: '"bar"' }
    ])
  })

  it('given an undefined json when get token should have no results', () => {
    const result = getTokens(undefined)

    expect(result).to.deep.equal([])
  })
})
