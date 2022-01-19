/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:@next/next/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'settings': {
    'react': {
      'version': 'latest',
    },
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'react',
  ],
  'rules': {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 },
    ],
    "react/display-name": "off"
  }
};
