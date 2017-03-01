var chai = require('chai');
var chalk = require('chalk');
var expect = chai.expect;

var lexer = require('../lib/lexer');
var colorizer = require('../lib/colorizer');
var customColors = {
  BRACE: chalk.white,
  BRACKET: chalk.white,
  COLON: chalk.white,
  COMMA: chalk.white,
  STRING_KEY: chalk.yellow,
  NULL_LITERAL: chalk.red,
  STRING_LITERAL: chalk.green,
  NUMBER_LITERAL: chalk.magenta.bold,
  BOOLEAN_LITERAL: chalk.cyan
};

var fixture = {
  foo: null,
  bar: {baz: true},
  number: 13,
  array: ['values']
};


describe('Colorizer', function () {
  it('colorizes with default options', function () {
    var tokens = lexer.getTokens(fixture);
    var result = colorizer.colorize(tokens);

    expect(result).to.equal([
      '',
      '[90m{', '[39m', '[35m\"foo\"', '[39m', '[90m:', '[39m', '[37mnull',
      '[39m', '[90m,', '[39m', '[35m\"bar\"', '[39m', '[90m:', '[39m', '[90m{',
      '[39m', '[35m\"baz\"', '[39m', '[90m:', '[39m', '[36mtrue', '[39m', '[90m}',
      '[39m', '[90m,', '[39m', '[35m\"number\"', '[39m', '[90m:', '[39m', '[32m13',
      '[39m', '[90m,', '[39m', '[35m\"array\"', '[39m', '[90m:', '[39m', '[90m[',
      '[39m', '[33m\"values\"', '[39m', '[90m]', '[39m', '[90m}', '[39m'
    ].join('\u001b'));
  });

  it('colorizes with custom colors', function () {
    var tokens = lexer.getTokens(fixture);
    var result = colorizer.colorize(tokens, {colors: customColors});

    expect(result).to.equal([
      '',
      '[37m{', '[39m', '[33m\"foo\"', '[39m', '[37m:', '[39m', '[31mnull',
      '[39m', '[37m,', '[39m', '[33m\"bar\"', '[39m', '[37m:', '[39m', '[37m{',
      '[39m', '[33m\"baz\"', '[39m', '[37m:', '[39m', '[36mtrue', '[39m', '[37m}',
      '[39m', '[37m,', '[39m', '[33m\"number\"', '[39m', '[37m:', '[39m', '[35m', '[1m13',
      '[22m', '[39m', '[37m,', '[39m', '[33m\"array\"', '[39m', '[37m:', '[39m', '[37m[',
      '[39m', '[32m\"values\"', '[39m', '[37m]', '[39m', '[37m}', '[39m',
    ].join('\u001b'));
  });

  it('colorizes with only specific overrides for colors', function () {
    var tokens = lexer.getTokens(fixture);
    var result = colorizer.colorize(tokens, {colors: {NUMBER_LITERAL: chalk.red}});

    expect(result).to.equal([
      '',
      '[90m{', '[39m', '[35m\"foo\"', '[39m', '[90m:', '[39m', '[37mnull',
      '[39m', '[90m,', '[39m', '[35m\"bar\"', '[39m', '[90m:', '[39m', '[90m{',
      '[39m', '[35m\"baz\"', '[39m', '[90m:', '[39m', '[36mtrue', '[39m', '[90m}',
      '[39m', '[90m,', '[39m', '[35m\"number\"', '[39m', '[90m:', '[39m', '[31m13',
      '[39m', '[90m,', '[39m', '[35m\"array\"', '[39m', '[90m:', '[39m', '[90m[',
      '[39m', '[33m\"values\"', '[39m', '[90m]', '[39m', '[90m}', '[39m'
    ].join('\u001b'));
  });
});
