const {resolve} = require("path");
const ScriptsPaths = require("../paths");
const Plugins = require("../plugins");
const RefreshPlugin = require("@rspack/plugin-react-refresh");
const {spawn} = require("child_process");

const isDev = process.env.NODE_ENV === "development";

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
    context: __dirname,
    mode: "development",
    target: ['web', 'electron-renderer'],
    entry: {
        main: resolve(ScriptsPaths.SrcRenderPath, "./main.tsx")
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: true,
    },
    devServer: {
        port: process.env.PORT,
        setupMiddlewares(middlewares) {
            let args = ['run', 'dev:main'];
            spawn('npm', args, {
                shell: true,
                stdio: 'inherit',
            })
                .on('error', (spawnError) => {
                    console.log(`RsPack --- Main Server err:${spawnError}`);
                });
            console.log('\x1Bc')
            return middlewares;
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                use: [
                    {
                        loader: "builtin:swc-loader",
                        options: {
                            sourceMap: true,
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true
                                },
                                transform: {
                                    react: {
                                        runtime: "automatic",
                                        development: isDev,
                                        refresh: isDev
                                    }
                                }
                            },
                        }
                    }
                ]
            }
        ]
    },
    builtins: {
        html: [
            {
                template: resolve(ScriptsPaths.RootPath, "./index.html")
            }
        ]
    },
    plugins: [
        ...Plugins,
        isDev ? new RefreshPlugin() : null
    ].filter(Boolean)
}
