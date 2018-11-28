const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const GetPages = require('./tools/getPages.js');
const pagesFolder = './src';

let pages = [...GetPages({ dir: pagesFolder })]; //add any specific pages to array if needed

const htmlPlugin = [...pages.map(element => {
		return new HtmlWebpackPlugin({
			template: 'src/' + element,
			filename: element
		})
	})
];

module.exports = merge(common, {
	entry: {
		app: './src/app.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			verbose: true,
			dry: false
		}),
		new UglifyJSPlugin()
	].concat(htmlPlugin)
});