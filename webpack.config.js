const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const CWDIR = process.cwd();

const config = {
    entry:[
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(CWDIR, '/client/index.js')],
    output: {
        path: path.join(CWDIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/' 
    },
    mode: "development",
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-spread'
                        ]
                    }
                },
                {
                    loader: 'react-hot-loader/webpack',
                    options: {
                        plugins: [
                            'react-hot-loader/babel',
                        ]
                    }
                }
            ]
        }]
    },
    plugins: [
        new htmlPlugin({
            template: path.join(__dirname, 'dist/index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;