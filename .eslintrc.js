module.exports = {
  extends: ['@fullstacksjs', '@fullstacksjs/eslint-config/typecheck'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {},
};
