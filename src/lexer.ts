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

export const tokenize = (input: string) => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    let matched = false;

    for (const tokenType of tokenTypes) {
      const match = input.slice(cursor).match(tokenType.regex);

      if (match) {
        tokens.push({
          type: tokenType.tokenType,
          value: match[0]
        });

        cursor += match[0].length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected character at position ${cursor}`);
    }
  }

  return tokens;
};