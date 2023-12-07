module.exports = {
  extends: [
    "@viclafouch/eslint-config-viclafouch",
    "@viclafouch/eslint-config-viclafouch/imports",
    "@viclafouch/eslint-config-viclafouch/typescript",
    "@viclafouch/eslint-config-viclafouch/prettier"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/require-await': 'off'
  },
};
