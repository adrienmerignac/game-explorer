const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss').default; // ✅ Correction ici !

module.exports = {
  plugins: [
    autoprefixer,
    purgecss({
      content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
