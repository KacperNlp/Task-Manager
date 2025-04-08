module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
    plugins: ['vue'],
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-console': 'warn',
    },
};
