module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  env: {
    node: true,
  },
  rules: {
    'linebreak-style': 0,
  }
};