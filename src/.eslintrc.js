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
  globals: {
    test: true,
    expect: true,
  },
  rules: {
    'linebreak-style': 0,
  }
};