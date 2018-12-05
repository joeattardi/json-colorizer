const { expect } = require('chai');

const { getTokens } = require('../lib/lexer');
const { colorize } = require('../lib/colorizer');
const customColors = {
  BRACE: 'white',
  BRACKET: 'white',
  COLON: 'white',
  COMMA: 'white',
  STRING_KEY: 'yellow',
  NULL_LITERAL: 'red',
  STRING_LITERAL: 'green',
  NUMBER_LITERAL: 'magenta.bold',
  BOOLEAN_LITERAL: 'cyan'
};

const fixture = {
  foo: null,
  bar: { baz: true },
  number: 13,
  array: ['values']
};

describe('Colorizer', function() {
  it('does not throw an error when there is whitespace', function() {
    expect(() => colorize(getTokens(JSON.stringify(fixture, null, 2)))).to.not.throw();
  });

  it('colorizes with default options', function() {
    const tokens = getTokens(fixture);
    const result = colorize(tokens);

    expect(result).to.equal(
      [
        '',
        '[90m{',
        '[39m',
        '[35m"foo"',
        '[39m',
        '[90m:',
        '[39m',
        '[37mnull',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"bar"',
        '[39m',
        '[90m:',
        '[39m',
        '[90m{',
        '[39m',
        '[35m"baz"',
        '[39m',
        '[90m:',
        '[39m',
        '[36mtrue',
        '[39m',
        '[90m}',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"number"',
        '[39m',
        '[90m:',
        '[39m',
        '[32m13',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"array"',
        '[39m',
        '[90m:',
        '[39m',
        '[90m[',
        '[39m',
        '[33m"values"',
        '[39m',
        '[90m]',
        '[39m',
        '[90m}',
        '[39m'
      ].join('\u001b')
    );
  });

  it('colorizes with custom colors', function() {
    const tokens = getTokens(fixture);
    const result = colorize(tokens, { colors: customColors });

    expect(result).to.equal(
      [
        '',
        '[37m{',
        '[39m',
        '[33m"foo"',
        '[39m',
        '[37m:',
        '[39m',
        '[31mnull',
        '[39m',
        '[37m,',
        '[39m',
        '[33m"bar"',
        '[39m',
        '[37m:',
        '[39m',
        '[37m{',
        '[39m',
        '[33m"baz"',
        '[39m',
        '[37m:',
        '[39m',
        '[36mtrue',
        '[39m',
        '[37m}',
        '[39m',
        '[37m,',
        '[39m',
        '[33m"number"',
        '[39m',
        '[37m:',
        '[39m',
        '[35m',
        '[1m13',
        '[22m',
        '[39m',
        '[37m,',
        '[39m',
        '[33m"array"',
        '[39m',
        '[37m:',
        '[39m',
        '[37m[',
        '[39m',
        '[32m"values"',
        '[39m',
        '[37m]',
        '[39m',
        '[37m}',
        '[39m'
      ].join('\u001b')
    );
  });

  it('colorizes with only specific overrides for colors', function() {
    const tokens = getTokens(fixture);
    const result = colorize(tokens, { colors: { NUMBER_LITERAL: 'red' } });

    expect(result).to.equal(
      [
        '',
        '[90m{',
        '[39m',
        '[35m"foo"',
        '[39m',
        '[90m:',
        '[39m',
        '[37mnull',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"bar"',
        '[39m',
        '[90m:',
        '[39m',
        '[90m{',
        '[39m',
        '[35m"baz"',
        '[39m',
        '[90m:',
        '[39m',
        '[36mtrue',
        '[39m',
        '[90m}',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"number"',
        '[39m',
        '[90m:',
        '[39m',
        '[31m13',
        '[39m',
        '[90m,',
        '[39m',
        '[35m"array"',
        '[39m',
        '[90m:',
        '[39m',
        '[90m[',
        '[39m',
        '[33m"values"',
        '[39m',
        '[90m]',
        '[39m',
        '[90m}',
        '[39m'
      ].join('\u001b')
    );
  });
});
