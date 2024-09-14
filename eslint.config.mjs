import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, module: true, process: true },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  eslintPluginPrettierConfig,
];
