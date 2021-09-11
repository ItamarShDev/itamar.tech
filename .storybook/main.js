const process = require("process");
module.exports = {
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: (config) => {
        config.resolve.modules.push(process.cwd() + "/node_modules");
        config.resolve.modules.push(process.cwd() + "/");

        config.resolve.symlinks = false;
        return config;
    },
};
