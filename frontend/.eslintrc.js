module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './components'],
          ['@pages', './pages'],
          ['@services', './services'],
          ['@styles', './styles'],
          ['@theme', './theme'],
          ['@utils', './utils'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
      node: {
        paths: ['./'],
      },
    },
  },
};
