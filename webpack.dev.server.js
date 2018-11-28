const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();

const 
	devConfig = require('./webpack.dev.js'),
	compiler = webpack(devConfig);


// Tell express to use the webpack-dev-middleware and use the webpack.common.js
// configuration file as a base.
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: devConfig.output.publicPath
}));

// Attach Hot reload for server
app.use(require("webpack-hot-middleware")(compiler));

// Serve the files on port 3000.
app.listen(3000, function () {
	console.log('Example app listening on port 3000!\n');
});