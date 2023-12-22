const {resolve} = require('path');

class ScriptsPaths {
    // root
    static RootPath = resolve(__dirname, '../');

    // main
    static SrcPath = resolve(this.RootPath, "./src");
    static SrcMainPath = resolve(this.SrcPath, "./main");
    static SrcRenderPath = resolve(this.SrcPath, "./render");

    // build output
    static AppPath = resolve(this.RootPath, "./app");
    static DistPath = resolve(this.AppPath, "./dist");
    static DistMainPath = resolve(this.DistPath, "./main");
    static DistRenderPath = resolve(this.DistPath, "./render");
}

module.exports = ScriptsPaths;
