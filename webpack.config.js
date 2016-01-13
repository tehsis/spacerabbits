var webpack = require('webpack');

module.exports = {  
  entry: './src/scripts/index.ts',
  output: {
    filename: 'dist/scripts/bunnywars.js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'babel-loader?presets[]=es2015!ts-loader' },
    ]
  }
}
