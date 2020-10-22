const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /fa-.*\.(ico|png|jpg|jpeg|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/font/fortawesome/' } }
            },
            {
                exclude: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')],
                rules: [
                    {
                        test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                        use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/font/misc/' } }
                    },
                    {
                        test: /\.(ico|png|jpg|jpeg|gif|svg)(\?.*)?$/,
                        use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/img/misc/' } }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src', 'index.html')
        })
    ],
    optimization: {
        splitChunks: { chunks: 'all' }
    }
});