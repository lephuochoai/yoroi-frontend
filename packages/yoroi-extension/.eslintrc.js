// @flow

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    },
  },
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    mocha: true,
    node: true,
    jest: true
  },
  rules: {
    'func-names': 'off',
    'new-cap': 'off',
    'arrow-parens': ['off'],
    'consistent-return': 'off',
    'comma-dangle': 'off',
    'generator-star-spacing': 'off',
    'import/no-unresolved': ['error', {
      ignore: ['cardano-wallet-browser']
    }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'lines-between-class-members': 'off',
    'no-multiple-empty-lines': 'off',
    'no-multi-spaces': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': 'off',
    'no-return-await': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 0,
    'prefer-destructuring': 0,
    'promise/param-names': 2,
    'promise/always-return': 2,
    'promise/catch-or-return': 2,
    'promise/no-native': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/button-has-type': 1,
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 1,
    'react/jsx-no-bind': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 0,
    'react/require-default-props': 1,
    'react/sort-comp': 0,
    'react/static-property-placement': ['warn', 'static public field'],
    'react/state-in-constructor': ['warn', 'never'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'class-methods-use-this': 0,
    'no-continue': 0,
    'no-duplicate-imports': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-multi-assign': 0,
    'no-undef-init': 0, // need this to improve Flow type inference
    'no-unneeded-ternary': ['error', { defaultAssignment: true }],
    'prefer-template': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-trailing-spaces': 1,
    'padded-blocks': 0,
    'no-undef': 1,
    'arrow-body-style': 0,
    'key-spacing': 1,
    'no-empty-function': 1,
    'max-len': ['warn', { code: 120 }],
    'no-useless-escape': 1,
    'prefer-const': 1,
    'object-curly-spacing': 1,
    'spaced-comment': 0,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'import/imports-first': 1,
    'react/jsx-indent': 1,
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'global-require': 'off',
    'no-await-in-loop': 0,
    'no-unused-expressions': 2,
    'no-lone-blocks': 0,
    'max-classes-per-file': 0,
    'no-floating-promise/no-floating-promise': 2,
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/no-dupe-keys': 2,
    'no-extra-boolean-cast': 0,
    'react/jsx-first-prop-new-line': 0,
    'no-restricted-properties': [
      2,
      { object: 'TrezorConnect', message: 'Use TrezorWrapper instead to minimize Trezor iframe lifespan', },
    ],
    'import/no-unused-modules': [1, { unusedExports: true }],
  },
  plugins: [
    'import',
    'promise',
    'react',
    'flowtype',
    'no-floating-promise',
    'prettier'
  ],
  globals: {
    chrome: true,
    API: true,
    NETWORK: true,
    MOBX_DEV_TOOLS: true,
    CONFIG: true,
    yoroi: true,
    nameof: true,
  }
};
