import lexer from 'json-lexer';

export function colorize(json: string | object) {
  const input = typeof json === 'string' ? json : JSON.stringify(json, null, 2);

  const tokens = lexer(input);

}
