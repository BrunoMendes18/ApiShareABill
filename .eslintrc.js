module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'arrow-body-style': 'off',
    'linebreak-style': 0,
    'new-Cap': [0, { newIsCapExceptions: 0 }],
    'no-return-await': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-undef': 0,
    'no-await-in-loop': 0,
    'no-else-return': 0,
    eqeqeq: 0,
    camelcase: 0,
  },
};
