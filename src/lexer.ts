export type TokenType = 'Whitespace' | 'Brace' | 'Bracket' | 'Colon' | 'Comma' | 'NumberLiteral' | 'StringKey' | 'StringLiteral' | 'BooleanLiteral' | 'NullLiteral';

export interface TokenDefinition {
  regex: RegExp;
  tokenType: TokenType;
}

export interface Token {
  type: TokenType;
  value: string;
}

const tokenTypes: TokenDefinition[] = [
  { regex: /^\s+/, tokenType: 'Whitespace' },
  { regex: /^[{}]/, tokenType: 'Brace' },
  { regex: /^[[\]]/, tokenType: 'Bracket' },
  { regex: /^:/, tokenType: 'Colon' },
  { regex: /^,/, tokenType: 'Comma' },
  { regex: /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i, tokenType: 'NumberLiteral' },
  { regex: /^"(?:\\.|[^"\\])*"(?=\s*:)/, tokenType: 'StringKey' },
  { regex: /^"(?:\\.|[^"\\])*"/, tokenType: 'StringLiteral' },
  { regex: /^true|^false/, tokenType: 'BooleanLiteral' },
  { regex: /^null/, tokenType: 'NullLiteral' }
];

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
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