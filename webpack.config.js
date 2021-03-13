const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ReactRefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopement = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopement ? 'development' : 'production', // ternario
    devtool: isDevelopement ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
    },
    plugins: [
        isDevelopement && new ReactRefreshWebPackPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean), //Hack para adicionar plugin de forma condicional no webpack //
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopement && require.resolve('react-refresh/babel')
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
};