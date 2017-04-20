module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  plugins: [
    'react'
  ],
  env: {
    browser: true,
  },
  rules: {
    'linebreak-style': 0,
  }
};