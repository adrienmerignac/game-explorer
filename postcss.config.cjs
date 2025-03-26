const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss').default;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    autoprefixer,
    ...(isProduction
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.{ts,tsx}'],
            defaultExtractor: content =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
