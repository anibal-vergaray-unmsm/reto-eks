module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'max-len': 'off',
    'new-cap': 'off',
    'require-jsdoc': 'off',
    'object-curly-spacing': ['error', 'always'],
    'no-invalid-this': 'off',
    'camelcase': 'off',
    'linebreak-style': 'off',
  },
};
