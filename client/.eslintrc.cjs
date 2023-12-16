module.exports = {
  extends: [
    '@viclafouch/eslint-config-viclafouch',
    '@viclafouch/eslint-config-viclafouch/react',
    '@viclafouch/eslint-config-viclafouch/hooks',
    '@viclafouch/eslint-config-viclafouch/imports',
    '@viclafouch/eslint-config-viclafouch/typescript',
    '@viclafouch/eslint-config-viclafouch/prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.cjs', 'dist', 'vite.config.ts'],
};
