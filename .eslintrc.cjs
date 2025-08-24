module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    'eslint:recommended',
    // Use TS plugin rules (even if most files are JS) for consistent linting in case TS is added later
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-empty': ['warn', { allowEmptyCatch: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-require-imports': 'off'
  },
  overrides: [
    // Keep JS simple and fast to lint
    {
      files: ['**/*.js'],
      parser: null,
      plugins: [],
      extends: ['eslint:recommended', 'prettier'],
    },
    // Node-only API files
    {
      files: ['api/**/*.js'],
      env: { node: true, browser: false },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      }
    }
  ],
  ignorePatterns: ['dist/', 'build/', 'node_modules/', '.vercel/', '.next/'],
};


