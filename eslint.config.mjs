import tseslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintImportPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default [
  {
    ignores: ["dist/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: eslintImportPlugin,
    },
    rules: {
      "no-underscore-dangle": "off",
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "max-len": [
        "error",
        {
          code: 130,
          tabWidth: 4,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      "max-params": ["error", 3],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "*.{css,scss}",
              group: "sibling",
              position: "after",
            },
          ],
          ["newlines-between"]: "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          ts: "never",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
];
