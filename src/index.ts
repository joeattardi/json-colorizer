import { tokenize, TokenType } from './lexer';
import * as colorette from 'colorette';
import { Color } from 'colorette';

export { colorette as color };

export type ColorTheme = Record<TokenType, Color>;

const defaultTheme: ColorTheme = {
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

export type ColorizeOptions = {
  theme?: ColorTheme;
  indent?: number;
}

const defaultOptions: ColorizeOptions = {
  theme: defaultTheme,
  indent: 2
};

function getJsonString(json: string | object, options: ColorizeOptions) {
  const object = typeof json === 'string' ? JSON.parse(json) : json;
  return JSON.stringify(object, null, options.indent ?? defaultOptions.indent);
}

export function colorize(json: string | object, options: ColorizeOptions) {
  const input = getJsonString(json, options);
  const tokens = tokenize(input);
  const theme = options.theme ?? defaultOptions.theme!;

  return tokens.reduce((output, token) => output + theme[token.type](token.value), '');
}

