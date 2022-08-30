// next.config.js
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    swcMinify: true,
    experimental: {
        jsconfigPaths: true,
    },
    i18n: {
        locales: ["en", "he"],
        defaultLocale: "en",
    },
    images: {
        domains: ["media.giphy.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
});
