import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src/**/*.{js,mjs,cjs,ts}", "tests/**/*.{js, ts, jsx, tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["test/**/*.{js, ts, jsx, tsx}"],
    ...jest.configs["flat/recommanded"],
    rules: {
      ...jest.configs["flat/recommanded"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettierRecommended,
  // eslintPluginPrettier,
];
