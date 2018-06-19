module.exports = {
  'extends': [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  'plugins': [
    'flowtype',
    'import'
  ],
  'settings': {
    'import/resolver': {
      'node': {
        'moduleDirectory': ['src', 'node_modules']
      }
    }
  },
  'rules': {
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.js','.jsx']
      }
    ],
    'semi': 0,
    'import/first': 0, // Too strict.
    'no-shadow': 0, // // Shadow is nice language feature.
    'react/prop-types': 0, // It's handled by Flow.
    'react/self-closing-comp': 0, // <Text> </Text> is fine.s
    'react/prefer-stateless-function': 0, // PureComponents ftw.
    'arrow-body-style': 0, // Too strict.
    'prefer-destructuring': 0, // Flow casting can need it.
    'import/extensions': 0, // Flow checks it.
    'no-alert': 0, // Too strict.
    'react/require-default-props': 0, // Not needed with Flow.
    'import/no-absolute-path': 0
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true,
    'jest': true
  }
}
