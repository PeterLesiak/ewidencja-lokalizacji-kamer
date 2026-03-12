/** @type {import('prettier').Config} */
export default {
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  tailwindFunctions: ['cn', 'cva'],
  printWidth: 90,
  singleQuote: true,
  tabWidth: 2,
};
