var chalk = require('chalk');

var defaultColors = {
  BRACE: chalk.gray,
  BRACKET: chalk.gray,
  COLON: chalk.gray,
  COMMA: chalk.gray,
  STRING_KEY: chalk.magenta,
  STRING_LITERAL: chalk.yellow,
  NUMBER_LITERAL: chalk.green,
  BOOLEAN_LITERAL: chalk.cyan,
  NULL_LITERAL: chalk.white
};

exports.colorize = function colorize(tokens, options) {
  var opts = options || {};
  var colors = opts.colors || {};
  var str = '';
  var colorFn;

  tokens.forEach(function (token) {
    colorFn = colors[token.type] || defaultColors[token.type];
    str += colorFn ? colorFn(token.value) : token.value;
  });

  return str;
};
