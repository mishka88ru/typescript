const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
	devServer: {
    static: [
      {
        publicPath: '/',
        directory: __dirname
      },
      {
        publicPath: '/node_modules/',
        directory: path.resolve(__dirname, 'node_modules'),
      },
		]
	},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
