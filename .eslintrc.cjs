module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Formatting and Style
    'jsx-quotes': ['warn', 'prefer-double'],
    semi: 'warn',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    // React Specific Rules
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // Import/Export Rules
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // Airbnb overrides - be mindful of these
    'no-plusplus': 'off',
    'no-alert': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'max-len': 'warn',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    "react/function-component-definition": 'off',
    "jsx-a11y/anchor-is-valid": "off",
    "no-nested-ternary": "off"
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      "alias": {
        "map": [["@", "./src"]],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
