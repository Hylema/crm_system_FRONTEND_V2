// Configuration for EsLint
// See: https://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "@vue/standard",
    "@vue/typescript/recommended"
  ],
  "plugins": [
    "eslint-plugin-import",
    "eslint-plugin-import-helpers",
    "sort-imports-es6-autofix"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "parser": "@typescript-eslint/parser"
  },
  "rules": {
    "sort-imports-es6-autofix/sort-imports-es6": [2, {
      "ignoreCase": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "no-trailing-spaces": ["error", { "skipBlankLines": true }]
  },
  "overrides": [
    {
      "files": [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      "env": {
        "mocha": true
      }
    }
  ]
}
