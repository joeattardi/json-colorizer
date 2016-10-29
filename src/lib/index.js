const lexer = require('./lexer');
const colorizer = require('./colorizer');

module.exports = function colorizeJson(json) {
  return colorizer.colorize(lexer.getTokens(json));
};
