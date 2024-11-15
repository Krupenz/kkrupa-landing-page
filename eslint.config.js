import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'],
        plugins: {
            js,
            ...ts.config.recommendedTypeChecked,
            react,
            reactHooks,
            reactRefresh,
            prettier,
        },
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
        },
        languageOptions: {
            parser: ts.parser,
            globals: {
                ...globals.browser,
            },
        },
    },
];
