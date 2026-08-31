import js from "@eslint/js";
import playwright from "eslint-plugin-playwright";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["playwright.config.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    files: ["pages/**/*.js"],
    plugins: { playwright },
    rules: {
      ...playwright.configs.recommended.rules,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  {
    files: ["tests/**/*.js", "utils/**/*.js", "config/**/*.js"],
    plugins: { playwright },
    rules: {
      ...playwright.configs.recommended.rules,
      "playwright/expect-expect": [
        "warn",
        {
          assertFunctionNames: [
            "expect",
            "expectRegistrationSuccess",
            "expectAccountOpened",
            "expectTransferComplete",
          ],
        },
      ],
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
  {
    ignores: ["node_modules", "playwright-report", "test-results"],
  },
];
