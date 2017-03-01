var chai = require('chai');
var expect = chai.expect;

var lexer = require('../lib/lexer');

describe('Lexer', function () {
  it('tokenizes a basic JSON object', function () {
    var result = lexer.getTokens({
      foo: 'bar' 
    });

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'BRACE', value: '}' }
    ]);
  }); 

  it('tokenizes a basic JSON string', function () {
    var result = lexer.getTokens('{"foo":"bar"}');

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'BRACE', value: '}' }
    ]);
  });

  it('includes whitespace', function () {
    var result = lexer.getTokens('{\n  "foo": "bar"\n}');

    expect(result).to.deep.equal([
      { type: 'BRACE', value: '{' },
      { type: 'WHITESPACE', value: '\n  ' },
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'COLON', value: ':' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'STRING_LITERAL', value: '"bar"' },
      { type: 'WHITESPACE', value: '\n' },
      { type: 'BRACE', value: '}' }
    ]);
  });

  it('tokenizes boolean values', function () {
    var result = lexer.getTokens('true');
    expect(result).to.deep.equal([{ type: 'BOOLEAN_LITERAL', value: 'true' }]);

    result = lexer.getTokens('false');
    expect(result).to.deep.equal([{ type: 'BOOLEAN_LITERAL', value: 'false' }]);

  });

  it('tokenizes integer values', function () {
    var result = lexer.getTokens('123');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '123' }]);

    result = lexer.getTokens('-10');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '-10' }]);
  });

  it('tokenizes a decimal number', function () {
    var result = lexer.getTokens('1.234');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '1.234' }]);
  });

  it('tokenizes a scientific notation number', function () {
    var result = lexer.getTokens('12e5');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12e5' }]);

    result = lexer.getTokens('12e+5');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12e+5' }]);

    result = lexer.getTokens('12E-5');
    expect(result).to.deep.equal([{ type: 'NUMBER_LITERAL', value: '12E-5' }]);
  });

  it('tokenizes null', function () {
    var result = lexer.getTokens('null');
    expect(result).to.deep.equal([{ type: 'NULL_LITERAL', value: 'null' }]);
  });

  it('tokenizes a string literal with brace characters', function () {
    var result = lexer.getTokens('"{hello}"');
    expect(result).to.deep.equal([{ type: 'STRING_LITERAL', value: '"{hello}"' }]);
  });

  it('tokenizes a key-value pair with whitespace between the :', function () {
    var result = lexer.getTokens('"foo" : "bar"');
    expect(result).to.deep.equal([
      { type: 'STRING_KEY', value: '"foo"' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'COLON', value: ':' },
      { type: 'WHITESPACE', value: ' ' },
      { type: 'STRING_LITERAL', value: '"bar"' }
    ]);
  });

});
