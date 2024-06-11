module.exports = {
  root: true,
  plugins: ['jest'],
  extends: ['airbnb-base', 'plugin:jest/recommended'],
    parserOptions: {
    ecmaVersion: "latest"
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
  },
};
