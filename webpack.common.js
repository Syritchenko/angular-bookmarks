const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectHtmlPlugin = require('inject-html-webpack-plugin');
const fs = require('graceful-fs');
const _ = require('lodash');

// Get json with packages
let sourcePlugins = JSON.parse(fs.readFileSync('./plugins.json'));

// Generate url for scripts and styles
function generateUrl(module, type) {
	if(type == 'css') {
		return _.map(sourcePlugins[module].css, function (x) { return `<link rel="stylesheet" href="public/${x}">`; });
	} else if (type == 'app') {
		return _.map(sourcePlugins[module].app, function (x) { return `<script src="public/${x}"></script>`; });
	} else if (type == 'vendor') {
		return _.map(sourcePlugins[module].vendor, function (x) { return `<script src="${x}"></script>`; });
	}
}

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: [
		new CleanWebpackPlugin(['./dist/build']),
		/*new HtmlWebpackPlugin({
			title: 'Production'
		}),*/

		new InjectHtmlPlugin({
			filename:'./dist/index.html',
			chunks:['index'],
			customInject:[{
				start:'<!-- start:landlord -->',
				end:'<!-- end:landlord -->',
				content: generateUrl('landlord', 'vendor')
			}]
		}),

		new InjectHtmlPlugin({
			filename:'./dist/index.html',
			chunks:['index'],
			processor: 10,
			customInject:[{
				start:'<!-- start:style -->',
				end:'<!-- end:style -->',
				content: generateUrl('auth', 'css')
			}]
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './dist/build')
	}
};