module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': 'off',
    },
};
