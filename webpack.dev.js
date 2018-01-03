const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	/*devServer: {
		contentBase: './public',
		port: 9000
	}*/

	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 2000,
			server: {baseDir: ['public']}
		})
	]
});
