import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/**', 'dist-ssr/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
    // TypeScript checks identifier resolution. JSX and type-only uses confuse these core rules.
    rules: { 'no-undef': 'off', 'no-unused-vars': 'off' },
  },
  { files: ['scripts/**/*.{js,mjs,cjs}'], languageOptions: { globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly', require: 'readonly', __dirname: 'readonly', setTimeout: 'readonly', URL: 'readonly' } } },
];
