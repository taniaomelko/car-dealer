import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import eslintPluginPrettierConfig from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  { ignores: ['node_modules', 'out/', '.next'] },
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: { ...globals.browser, module: true, process: true, React: true },
    },
  },
  {
    plugins: {
      react,
      prettier,
      typescript,
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
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
