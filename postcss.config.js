// const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	plugins: {
		/*'precss': {},*/
		'autoprefixer': {
			browsers: ['last 2 versions', 'safari >= 7.1', 'ie >= 10', 'opera >= 20', 'ios 8', 'android 4.4.4' ]
		},
		/*'postcss-assets': {
			loadPaths: ['**'],
			basePath: 'public/'
		}*/
		/*,
		'cssnano': {
			preset: 'default',
		}*/
	}
};