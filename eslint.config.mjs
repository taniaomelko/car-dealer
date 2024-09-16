import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { ignores: ['node_modules', 'out/', '.next'] },
  {
    languageOptions: {
      globals: { ...globals.browser, module: true, process: true },
    },
  },
  {
    plugins: {
      react,
      prettier,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  eslintPluginPrettierConfig,
  {
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
