// eslint.config.mjs
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'warn',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/sw.js',
      'public/workbox-*.js'
    ]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    }
  }
];