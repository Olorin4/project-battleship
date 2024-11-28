import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import jestPlugin from "eslint-plugin-jest";

export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    eslintPluginPrettier,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "arrow-body-style": ["error", "as-needed"],
        },
    },
    {
        files: ["tests/**/*"], // Adjust the pattern as needed
        plugins: {
            jest: jestPlugin,
        },
        env: {
            "jest/globals": true,
            node: true,
        },
        languageOptions: {
            globals: jestPlugin.environments.globals, // Jest globals
        },
        rules: {
            ...jestPlugin.configs.recommended.rules, // Recommended Jest rules
        },
    },
];
