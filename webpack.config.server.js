const path = require('path');
const nodeExternals = require('webpack-node-externals');

const CWDIR = process.cwd();

const config = {
    entry: path.join(CWDIR, "/server/server.js"),
    output: {
        path: path.join(CWDIR, "/dist"),
        filename: "bundledServer.js",
        libraryTarget: "commonjs2",
        publicPath: "/dist/"
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}

module.exports = config;