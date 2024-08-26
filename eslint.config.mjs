import tseslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintImportPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  {
    ignores: ['dist/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: eslintImportPlugin,
    },
    rules: {
      'no-underscore-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'max-len': [
        'error',
        {
          code: 130,
          tabWidth: 4,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-params': ['error', 4],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          ['newlines-between']: 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          trailingComma: 'all',
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
];
