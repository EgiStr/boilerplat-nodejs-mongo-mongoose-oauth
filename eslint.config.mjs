import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  pluginJs.rules.recommended,
  pluginJs.configs.recommended,
];