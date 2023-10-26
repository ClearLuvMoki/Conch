const nodeRegex = /\.node$/;


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
            test: nodeRegex,
            use: [
                {
                    loader: 'native-addon-loader',
                }
            ]
        }
    ]
}
