const nodeRegex = /\.node$/;
const assetsRegex = /\.(jpe?g|png|gif|pdf|svg)$/;

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: {
                                tailwindcss: {},
                                autoprefixer: {},
                            },
                        },
                    },
                },
            ],
            type: 'css',
        },
        {
            test: assetsRegex,
            type: 'asset/resource',
        },
        {
            test: nodeRegex,
            use: [
                {
                    loader: 'native-addon-loader',
                }
            ]
        }
    ]
}
