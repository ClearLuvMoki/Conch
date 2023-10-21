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
    ]
}
