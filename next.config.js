// next.config.js
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        jsconfigPaths: true,
    },
    i18n: {
        locales: [,l"en", "he"],
        defaultLocale: "en",
    },
    images: {
        domains: ["media.giphy.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
});
