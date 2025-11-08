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
			...vueTsConfigs.rules,
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
			"vue/multi-word-component-names": "off", // Desativa nomes multi-palavra
			"no-unused-vars": "warn", // Aviso para variáveis não usadas
			"no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // Console permitido em dev
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"vue/multi-word-component-names": "off",
			"vue/attribute-hyphenation": "off",
			"vue/no-v-html": "off",
			"vue/v-on-event-hyphenation": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-explicit-any": "off",
		},
	},

	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs["flat/recommended"],
	vueTsConfigs.recommended,
	skipFormatting,
)
