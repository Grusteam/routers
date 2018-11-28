const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadPlugin = require('./tools/reloadPlugin.js');
const IncludeFiles = require('./tools/includeFiles.js'); // does not seem to be useful anymore
const GetPages = require('./tools/getPages.js');
const pagesFolder = './src';

let pages = [...GetPages({ dir: pagesFolder })]; //add any specific pages to array if needed

const htmlPlugin = [...pages.map(element => {
		return new HtmlWebpackPlugin({
			template: 'src/' + element,
			filename: element
		})
	}),
	/* new IncludeFiles({ dir: 'templates' }), */ 
	new ReloadPlugin({checkReload: true})
];

module.exports = merge(common, {
	entry: {
		app: ['babel-polyfill', './src/app.js']
	},
	devServer: {
		port: 8000,
		// host: "0.0.0.0", // for external access via wi-fi. Not working :(
		historyApiFallback: true,
		contentBase: "./dist",
		watchContentBase: true,
		// quiet: true,
		watchOptions: {
			ignored: /node_modules/
		},
		hot: true,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				
				bypass: function(req, res, proxyOptions) {
					if (req.headers.accept.indexOf("html") !== -1) {
						console.log("Skipping proxy for browser request.");
						return "/index.html";
					}
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(["dist"], {
			verbose: true,
			dry: false
		}),
		new WriteFilePlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	].concat(htmlPlugin)
});
