import vue from "eslint-plugin-vue";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
), {
    plugins: {
        vue,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: parser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            parser: [{
                ts: "@typescript-eslint/parser",
            }, {
                js: "espree",
            }, {
                "<template>": "espree",
            }],
        },
    },

    rules: {
        semi: ["error", "always"],
        quotes: ["error", "single"],

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "vue/max-attributes-per-line": ["error", {
            singleline: {
                max: 4,
            },

            multiline: {
                max: 2,
            },
        }],
    },
}];