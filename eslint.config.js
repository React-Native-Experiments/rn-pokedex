// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const pluginQuery = require("@tanstack/eslint-plugin-query");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  ...pluginQuery.configs["flat/recommended"],
  expoConfig,
  prettierConfig,
  {
    ignores: ["dist/*"],
  },
]);
