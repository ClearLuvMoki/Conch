const {join} = require("path")
const {rootPath, packagesThinkRootPath} = require("../paths");
const Module = require("./think.module")
const CommonConfig = require("./think.common")
const {spawn} = require("child_process");

/**
 * @type {import('@rspack/cli').Configuration}
 */
let Config = {
    context: __dirname,
    mode: "development",
    target: ['web'],
    entry: {
        main: join(packagesThinkRootPath, "./src/main.tsx")
    },
    module: Module,
    watchOptions: {
        ignored: /node_modules/,
        poll: true,
    },
    devServer: {
        port: 8890,
    },
    builtins: {
        html: [
            {
                template: join(packagesThinkRootPath, "./index.html")
            }
        ]
    },
};

Config = Object.assign(Config, {...CommonConfig})
module.exports = Config;
