import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

// /ESLint is a tool used to analyze JavaScript code for potential errors, enforce coding standards, and ensure code quality.
// This configuration defines rules and settings for linting (analyzing) your code.
/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];