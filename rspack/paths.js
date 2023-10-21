const path = require('path');

const rootPath = path.join(__dirname, '../');

const srcPath = path.join(rootPath, './src');

const srcMainPath = path.join(srcPath, './main');
const srcRendererPath = path.join(srcPath, './render');

module.exports = {
    rootPath,
    srcPath,
    srcMainPath,
    srcRendererPath,
};
