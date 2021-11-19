module.exports = {
  plugins: ['prettier'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
