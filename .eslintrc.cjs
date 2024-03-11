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
    // Only force func names if needed
    "func-names": ["error", "as-needed"],
    // Allow both function declarations and expressions
    "func-style": "off",
    // Exclude some commonly used iterators
    "id-length": ["error", { exceptions: ["i", "j", "k"] }],
    // Disable max-statements
    "max-statements": "off",
    // Enforce separate lines for multiline comments
    "multiline-comment-style": ["error", "separate-lines"],
    // Allow use of "continue"
    "no-continue": "off",
    // Allow magic numbers
    "no-magic-numbers": "off",
    // Force separate var declaration
    "one-var": ["error", "never"],
    // Add support for the "@" alias
    "perfectionist/sort-imports": [
      "error",
      {
        groups: [
          "type",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        "internal-pattern": ["~/**", "@/**"],
      },
    ],
    // Disable sorting rules, as we are using the perfectionist plugin that auto-fixes them.
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "off",
    // Disable attribute order as it conflicts with perfections order
    "vue/attributes-order": "off",
  },
};
