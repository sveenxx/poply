/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: 'always',
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindConfig: './packages/config/tailwind',
};
