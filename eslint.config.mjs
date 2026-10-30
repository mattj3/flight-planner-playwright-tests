import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default tseslint.config(
  { ignores: ["node_modules/", "playwright-report/", "test-results/", "blob-report/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["tests/**/*.ts"],
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      // Assertions live in page-object helpers (getLatitude etc.) as well as in tests.
      "playwright/expect-expect": ["warn", { assertFunctionNames: ["expect"] }],
    },
  },
);
