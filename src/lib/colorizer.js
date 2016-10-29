var chalk = require('chalk');

var colors = {
  BRACE: chalk.gray,
  BRACKET: chalk.gray,
  COLON: chalk.gray,
  COMMA: chalk.gray,
  STRING_KEY: chalk.magenta,
  STRING_LITERAL: chalk.yellow,
  NUMBER_LITERAL: chalk.green,
  BOOLEAN_LITERAL: chalk.cyan
};

exports.colorize = function colorize(tokens) {
  var str = '';
  var colorFn;

  tokens.forEach(function (token) {
    colorFn = colors[token.type];
    str += colorFn ? colorFn(token.value) : token.value;
  });

  return str;
};
