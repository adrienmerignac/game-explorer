const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    autoprefixer,
    purgecss({
      content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
