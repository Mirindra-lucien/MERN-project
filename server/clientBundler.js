var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('../webpack.config')

const compile = (app) => {
    const compiler = webpack(config);
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    });
    const hotMiddleware = webpackHotMiddleware(compiler);
    app.use(devMiddleware);
    app.use(hotMiddleware);
}

module.exports = {compile};