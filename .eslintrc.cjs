/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:all",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
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
  root: true,
  rules: {
    "@typescript-eslint/no-shadow": ["error"],
    // Don't force capitalized comments
    "capitalized-comments": ["off"],
    // Only force func names if needed
    "func-names": ["error", "as-needed"],
    // Allow both function declarations and expressions
    "func-style": "off",
    // Exclude some commonly used iterators
    "id-length": ["error", { exceptions: ["i", "j", "k"] }],
    // Disable max-params
    "max-params": "off",
    // Disable max-statements
    "max-statements": "off",
    // Enforce separate lines for multiline comments
    "multiline-comment-style": ["error", "separate-lines"],
    // Allow use of "continue"
    "no-continue": "off",
    // Allow magic numbers
    "no-magic-numbers": "off",
    // Disable no-shadow because of upstream bug
    // Allow negated conditions
    "no-negated-condition": "off",
    // https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856
    "no-shadow": "off",
    // Force separate var declaration
    "one-var": ["error", "never"],
    // Disable sorting rules
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "off",
  },
};
