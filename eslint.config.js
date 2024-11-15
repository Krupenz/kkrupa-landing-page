import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

import prettier from 'eslint-config-prettier';

export default [
    {
        files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'],
        plugins: {
            js,
            ts,
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
