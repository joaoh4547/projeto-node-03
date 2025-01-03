import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { globals: globals.node }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ["dist/*"],
        rules:{
            quotes: ["error", "double"],
            semi: ["error", "always"],
            indent: ["error", 4],
            "linebreak-style": ["error", "unix"],
            "@typescript-eslint/no-explicit-any": "off"
        },
    }
];