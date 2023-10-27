const {join} = require("path")
const {rootPath, srcRendererPath} = require("../paths");
const Module = require("./render.module")
const CommonConfig = require("./render.common")
const {spawn} = require("child_process");

/**
 * @type {import('@rspack/cli').Configuration}
 */
let Config = {
    context: __dirname,
    mode: "development",
    target: ['web', 'electron-renderer'],
    entry: {
        main: join(srcRendererPath, "./main.tsx")
    },
    module: Module,
    watchOptions: {
        ignored: /node_modules/,
        poll: true,
    },
    devServer: {
        port: process.env.PORT || 8888,
        setupMiddlewares(middlewares) {
            let args = ['run', 'dev:main'];
            spawn('npm', args, {
                shell: true,
                stdio: 'inherit',
            })
                .on('error', (spawnError) => {
                    console.log(`Rspack --- Main Server err:${spawnError}`);
                });
            return middlewares;
        }
    },
    builtins: {
        html: [
            {
                template: join(rootPath, "./index.html")
            }
        ]
    },
};

Config = Object.assign(Config, {...CommonConfig})
module.exports = Config;
