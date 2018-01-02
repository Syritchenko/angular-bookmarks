const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InjectHtmlPlugin = require('inject-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('graceful-fs');
const _ = require('lodash');

// Get json with packages
let sourcePlugins = JSON.parse(fs.readFileSync('./plugins.json'));

// Generate url for scripts and styles
function generateUrl(module, type) {
	if(type == 'css') {
		return _.map(sourcePlugins[module].css, function (x) { return `<link rel="stylesheet" href="${x}">`; });
	} else if (type == 'app') {
		return _.map(sourcePlugins[module].app, function (x) { return `<script src="${x}"></script>`; });
	} else if (type == 'vendor') {
		return _.map(sourcePlugins[module].vendor, function (x) { return `<script src="${x}"></script>`; });
	}
}

module.exports = {
	entry: {
		app: [
			'./resources/index.js',
			'./resources/assets/scss/app.scss'
		]
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './public/build')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-es2015', 'babel-preset-stage-0']
					}
				}
			},

			{
				test: /\.s?css$/,
				include: path.resolve(__dirname, './resources/assets/scss'),
				use: ExtractTextPlugin.extract({
					use: [
						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }
					],
					fallback: 'style-loader'
				})
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(['./public/build']),

		new ExtractTextPlugin({
			filename: '[name].css'
			//disable: process.env.NODE_ENV === 'development'
		}),

		new InjectHtmlPlugin({
			filename:'./public/index.html',
			chunks:['index'],
			customInject:[
				{
					start:'<!-- start:main-app -->',
					end:'<!-- end:main-app -->',
					content: generateUrl('main', 'app')
				},
				{
					start:'<!-- start:main-vendor -->',
					end:'<!-- end:main-vendor -->',
					content: generateUrl('main', 'vendor')
				},
				{
					start:'<!-- start:style -->',
					end:'<!-- end:style -->',
					content: generateUrl('main', 'css')
				}
			]
		})
	]
};