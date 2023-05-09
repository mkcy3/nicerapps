module.exports = {
  extends: [
    'next',
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'import/newline-after-import': 'error',
    'no-console': 1,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
    react: {
      version: '18.2.0',
    },
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
}
