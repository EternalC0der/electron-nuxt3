module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    'vue/no-v-html': 'off',
    'no-console': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-throw-literal': 'off',
    'import/no-named-as-default': 'off'
  }
}
