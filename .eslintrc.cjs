module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    //"@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:qwik/recommended",
  ],
  //parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prefer-spread": "off",
    "no-case-declarations": "off",
    "no-console": "off",

    // FIXME src/entry.dev.jsx 13:8  error  'Root' is defined but never used  no-unused-vars
    "no-unused-vars": "off",

    // eslint-plugin-qwik
    'qwik/valid-lexical-scope': 'off', // requires @typescript-eslint/parser
    /*
    'qwik/use-method-usage': 'off',
    'qwik/valid-lexical-scope': 'error',
    'qwik/no-react-props': 'off',
    'qwik/prefer-classlist': 'warn',
    'qwik/jsx-no-script-url': 'warn',
    'qwik/loader-location': 'warn',
    'qwik/jsx-key': 'warn',
    'qwik/unused-server': 'off',
    'qwik/jsx-img': 'warn',
    'qwik/jsx-a': 'warn',
    'qwik/no-use-visible-task': 'warn',
    */

  },
};
