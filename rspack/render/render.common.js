const {join, resolve, re} = require("path");
const {rootPath, srcPath, srcRendererPath} = require("../paths")

/**
 * @type {import('@rspack/cli').Configuration}
 */
const CommonConfig = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 1,
            minSize: 20000,
        },
    },
    resolve: {
        alias: {
            '@/src': join(rootPath, './src/'),
            // '@/assets': join(srcRendererPath, '/assets'),
            // '@/components': join(srcRendererPath, '/components'),
            '@/Pages': join(srcRendererPath, '/Pages'),
            '@/Utils': join(srcRendererPath, '/Utils'),
            '@/Router': join(srcRendererPath, '/Router'),
            '@/Layout': join(srcRendererPath, '/Layout'),
            // '@/store': join(srcRendererPath, '/store'),
            // '@/logger': join(srcRendererPath, '/logger'),
            // '@/hooks': join(srcRendererPath, '/hooks'),
            // '@/resources': join(rootPath, './resources/'),
            // '@/types': join(rootPath, './@types/'),
            // '@/request': join(srcRendererPath, '/request/'),
            // '@/rIpc': join(srcRendererPath, '/rIpc/'),
            // '@/IndexDB': join(srcRendererPath, '/IndexDB/'),
            '@/constant': join(srcPath, './constant/'),
            // '@/i18n': join(srcRendererPath, '/i18n/'),
        },
        extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },

}
module.exports = CommonConfig;
