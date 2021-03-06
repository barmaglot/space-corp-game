module.exports = {
    root: true,
    extends: [
        'prettier',
        'prettier/react',
        'eslint-config-prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': ['error'],
        'no-undef': 'error',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'react/jsx-no-duplicate-props': 2,
        'global-require': 0,
        'object-curly-spacing': ['error', 'always'],
        'no-unused-vars': 'error',
        'eslint-comments/no-unlimited-disable': false,
        semi: 'error',
        'no-trailing-spaces': 'error',
        'block-spacing': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-whitespace-before-property': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        quotes: ['error', 'single'],
        'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'keyword-spacing': ['error'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'arrow-parens': ['error', 'as-needed'],
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['prettier'],
};
