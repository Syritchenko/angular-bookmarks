const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // don't minify when exist >ES6
const common = require('./webpack.common.js');

module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin()
	]
});