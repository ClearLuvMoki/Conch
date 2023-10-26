const { join } = require('path');
const { srcMainPath, releaseMainPath, srcPath } = require('../paths');
const CommonConfig = require('../render/render.common');
const Module = require('../render/render.module');

/**
 * @type {import('@rspack/cli').Configuration}
 */
let MainProdConfig = {
    mode: 'production',
    target: 'electron-main',
    entry: {
        index: join(srcMainPath, './index.ts'),
        preload: join(srcPath, './preload/index.js')
    },
    output: {
        path: join(releaseMainPath),
        filename: '[name].js',
        clean: true,
    },
    module: Module,
};

Object.assign(MainProdConfig, { ...CommonConfig });

module.exports = MainProdConfig;
