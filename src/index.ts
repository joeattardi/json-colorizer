import { tokenize, TokenType } from './lexer';
import * as colorette from 'colorette';

type ColorMappings = Record<TokenType, colorette.Color>;

const colors: ColorMappings = {
  Whitespace: colorette.gray,
  Brace: colorette.gray,
  Bracket: colorette.gray,
  Colon: colorette.gray,
  Comma: colorette.gray,
  StringKey: colorette.magenta,
  StringLiteral: colorette.yellow,
  NumberLiteral: colorette.green,
  BooleanLiteral: colorette.cyan,
  NullLiteral: colorette.white  
}

export function colorize(json: string | object) {
  const input = typeof json === 'string' ? json : JSON.stringify(json, null, 2);

  const tokens = tokenize(input);

  let output = '';

  tokens.forEach(token => {
    const color = colors[token.type];
    output += color(token.value);
  });

  return output;
}
