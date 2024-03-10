/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:all",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:perfectionist/recommended-natural",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      extends: ["plugin:cypress/recommended"],
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["perfectionist"],
  root: true,
  rules: {
    // Don't force capitalized comments
    "capitalized-comments": ["off"],
    // Enforce separate lines for multiline comments
    "multiline-comment-style": ["error", "separate-lines"],
    "no-magic-numbers": "off",
    // Force separate var declaration
    "one-var": ["error", "never"],
    // Disable sorting rules, as we are using the perfectionist plugin that auto-fixes them.
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "off",
  },
};
