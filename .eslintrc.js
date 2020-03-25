module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'comma-dangle': ['error', 'never'],
    curly: ['error', 'multi'],
    quotes: 0,
  },
};
