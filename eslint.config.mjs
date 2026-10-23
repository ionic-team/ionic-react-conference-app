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
      // Every page exports both the component and a `connect()`-wrapped default,
      // which fast refresh can't follow. Revisit if the custom connect HOC in
      // data/connect.tsx is replaced with hooks.
      'react-refresh/only-export-components': 'off',
      // `connect()` and several page props use `{}` as an empty-props generic.
      '@typescript-eslint/no-empty-object-type': 'off',
      // The demo uses `cond && fn()` and ternaries for side effects throughout.
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
]);
