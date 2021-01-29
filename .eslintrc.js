module.exports = {
  extends: 'react-app',
  globals: {
    chrome: 'readonly',
  },
  rules: {
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
  },
}
