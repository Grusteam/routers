const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/' // set absolute path to css and js files
	},
	devtool: 'inline-source-map',
	
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader', 
							options: {
								sourceMap: true
							}
						}
					],
				})),
			},
			{
				test: /\.css$/,
				loader: 'postcss-loader',
				options: {
					sourceMap: true,
					config: {
						path: './postcss.config.js',
					},
				},
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: ['@babel/preset-react'],
						plugins: ["@babel/plugin-proposal-object-rest-spread"]
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader']
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}]
	},
	plugins: [
		new ExtractTextPlugin("styles/styles.css"),
		new webpack.NamedModulesPlugin(),
		new CopyWebpackPlugin([{ from: 'src/public' }]),
		new CopyWebpackPlugin([{ from: 'src/data', to: 'data' }]),
	]
};