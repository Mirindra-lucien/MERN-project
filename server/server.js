const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./../webpack.config');
const app = express();
const compiler = webpack(webpackConfig);
const template = require('./../template').default;

app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use('dist', express.static(path.join(__dirname, "../dist")));
app.use('/', (req, res) => {
    res.send(template())
})
app.listen(8081, function ert(){
    console.log("server run on port 8081")
});