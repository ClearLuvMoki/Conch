const {join, resolve} = require('path');
const {srcRendererPath, releaseRendererPath, rootPath} = require('../paths');
const CommonConfig = require('./render.common');
const Module = require('./render.module');

/**
 * @type {import('@rspack/cli').Configuration}
 */
let ProdConfig = {
    mode: 'production',
    entry: {
        main: join(srcRendererPath, './main.tsx'),
    },
    output: {
        path: resolve(releaseRendererPath),
        filename: 'js/[name].[contenthash:8].bundle.js',
        clean: true,
    },
    module: Module,
    builtins: {
        html: [
            {
                template: join(rootPath, "./index.html")
            }
        ]
    },
};

ProdConfig = Object.assign(ProdConfig, {...CommonConfig});
module.exports = ProdConfig;
