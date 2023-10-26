# Conch

## Add better-sqlite3

> node >= 18.12.0
> python = 3.11.0 (3.12.0会造成rebuild失败)

```shell
pnpm install better-sqlite3 @electron/rebuild -D
cd ./node_modules/better-sqlite3
..\.bin\electron-rebuild 
```

## Build better-sqlite3
> 打包后默认会寻找 `asar/build` 中的 `better_sqlite3.node`, 所以在打包中需要 copy 一份过去
> 本项目自动copy文件失败可能是因为使用了 `typeorm` & `rspack`;

```js
module.exports  = {
    // ...
    builtins: {
        copy: {
            patterns: [
                {
                    from: join({rootPath}, "./node_modules/better-sqlite3/build/Release/better_sqlite3.node"),
                    to: join({buildPath}, "./build"),
                    force: true,
                }
            ]
        }
    }
    // ...
}
```
