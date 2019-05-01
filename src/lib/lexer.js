const tokenTypes = [
  { regex: /^\s+/, tokenType: 'WHITESPACE' },
  { regex: /^[{}]/, tokenType: 'BRACE' },
  { regex: /^[[\]]/, tokenType: 'BRACKET' },
  { regex: /^:/, tokenType: 'COLON' },
  { regex: /^,/, tokenType: 'COMMA' },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: 'NUMBER_LITERAL' },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: 'STRING_KEY' },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: 'STRING_LITERAL' },
  { regex: /^true|^false/, tokenType: 'BOOLEAN_LITERAL' },
  { regex: /^null/, tokenType: 'NULL_LITERAL' }
];

exports.getTokens = function getTokens(json, options = {}) {
  let input;

  if (options.pretty) {
    const inputObj = typeof json === 'string' ? JSON.parse(json) : json;
    input = JSON.stringify(inputObj, null, 2);
  } else {
    input = typeof json === 'string' ? json : JSON.stringify(json);
  }

  let tokens = [];
  let foundToken;

  do {
    foundToken = false;
    for (let i = 0; i < tokenTypes.length; i++) {
      const match = tokenTypes[i].regex.exec(input);
      if (match) {
        tokens.push({ type: tokenTypes[i].tokenType, value: match[0] });
        input = input.substring(match[0].length);
        foundToken = true;
        break;
      }
    }
  } while (input.length > 0 && foundToken);

  return tokens;
};
