const {join, resolve, re} = require("path");
const {packagesThinkRootPath, srcPath, srcRendererPath} = require("../paths")

console.log(packagesThinkRootPath, 'packagesThinkRootPath')
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
            '@/src': join(packagesThinkRootPath, './src'),
            '@/common': join(srcPath, './common'),
            '@/Constant': join(packagesThinkRootPath, './src/Constant'),
            '@/Components': join(packagesThinkRootPath, './src/Components'),
            '@/Pages': join(packagesThinkRootPath, './src/Pages'),
            '@/Utils': join(packagesThinkRootPath, './src/Utils'),
            '@/Router': join(packagesThinkRootPath, './src/Router'),
            '@/Layout': join(packagesThinkRootPath, './src/Layout'),
            '@/types': join(srcPath, './types/'),
            '@/Stores': join(packagesThinkRootPath, './src/Stores/'),
            '@/RIpc': join(srcRendererPath, './RIpc/'),
        },
        extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },

}
module.exports = CommonConfig;
