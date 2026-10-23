import ionic from '@ionic/eslint-config/recommended.js';
import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist/**', 'android/**', 'ios/**'] },
  ionic,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Pages export a component wrapped in the custom `connect()` HOC from data/connect.tsx.
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true, allowCompoundComponents: true, extraHOCs: ['connect'] },
      ],
      // `connect()` and several page props use `{}` as an empty-props generic.
      '@typescript-eslint/no-empty-object-type': 'off',
      // The demo uses `cond && fn()` and ternaries for side effects throughout.
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    // The snapshot test predates the current tooling and has no runner; it is
    // still typechecked by `tsc`, so keep it linted with jest globals defined.
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);
