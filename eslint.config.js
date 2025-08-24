import globals from "globals";
import plugin from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/**"],
    files: ["src/**/*.ts"],
    languageOptions: {
      parser,
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
    },
  },
];
