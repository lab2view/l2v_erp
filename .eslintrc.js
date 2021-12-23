module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
    jquery: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "prettier"],
  parserOptions: {
    parser: "eslint",
  },
  ignorePatterns: ["node_modules/**", "**/dist/**"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
