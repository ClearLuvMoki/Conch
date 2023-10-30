const path = require('path');

const rootPath = path.join(__dirname, '../');

const srcPath = path.join(rootPath, './src');
const packagesPath = path.join(rootPath, './packages');
const packagesThinkRootPath = path.join(packagesPath, './Think');

const srcMainPath = path.join(srcPath, './main');
const srcRendererPath = path.join(srcPath, './render');

// 打包进程目录
const appPath = path.join(rootPath, './app');
const distPath = path.join(appPath, './dist');
// 打包主进程目录
const releaseMainPath = path.join(distPath, './main');
// 打包渲染进程目录
const releaseRendererPath = path.join(distPath, './render');

module.exports = {
    rootPath,
    srcPath,
    srcMainPath,
    srcRendererPath,
    appPath,
    distPath,
    releaseMainPath,
    releaseRendererPath,
    packagesPath,
    packagesThinkRootPath
};
