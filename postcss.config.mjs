/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <- updated for Tailwind v4+
    autoprefixer: {},
  },
};

export default config;