import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			"comma-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
			"vue/max-attributes-per-line": [
				"error",
				{
					singleline: { max: 4 },
					multiline: { max: 4 },
				},
			],
			"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
			"no-unused-vars": "warn",
			"no-empty-function": "error",
			"vue/no-v-html": "error",
			"vue/v-on-event-hyphenation": "warn",
			"vue/attribute-hyphenation": "warn",
			"vue/require-default-prop": "off",
			"vue/no-required-prop-with-default": "off",
			"vue/multi-word-component-names": "warn", // Allow single-word component names
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-require-imports": "warn",
			"@typescript-eslint/no-non-null-assertion": "warn",
			"@typescript-eslint/ban-ts-comment": "warn",
		},
	},

	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs["flat/recommended"],
	vueTsConfigs.recommended,
	skipFormatting,
)
