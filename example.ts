import { colorize, color, ColorTheme } from './src/index';

const theme: ColorTheme = {
  Whitespace: color.gray,
  Brace: color.gray,
  Bracket: color.gray,
  Colon: color.gray,
  Comma: color.gray,
  StringKey: color.cyan,
  StringLiteral: color.yellow,
  NumberLiteral: color.green,
  BooleanLiteral: color.cyan,
  NullLiteral: color.white
};

console.log(colorize({
  name: 'Joe',
  age: 42
}, {
  theme
}));
