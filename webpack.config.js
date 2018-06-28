const path = require('path');

module.exports = {
	entry: ['./js/form.js'],
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    // presets: ['es2015']
                }
            }
        ]
    }

};