const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectHtmlPlugin = require('inject-html-webpack-plugin');
const fs = require('graceful-fs');
const _ = require('lodash');


let sourcePlugins = JSON.parse(fs.readFileSync('./plugins.json'));

/*var vendor_files = _.map(sourceGulpFile[module].vendor, function (x) { return 'public/' + x; });
var css_files = _.map(sourceGulpFile[module].css, function (x) { return 'public/' + x; });
var app_files = _.map(sourceGulpFile[module].app, function (x) { return 'public/' + x; });*/

let vendorFiles = _.map(sourcePlugins['auth'].vendor, function (x) { return `<script src="public/${x}"></script>`; });
let styleFiles = _.map(sourcePlugins['auth'].css, function (x) { return `<link rel="stylesheet" href="public/${x}">`; });

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
				content: vendorFiles
			}]
		}),

		new InjectHtmlPlugin({
			filename:'./dist/index.html',
			chunks:['index'],
			customInject:[{
				start:'<!-- start:style -->',
				end:'<!-- end:style -->',
				content: styleFiles
			}]
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './dist/build')
	}
};