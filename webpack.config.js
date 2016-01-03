var webpack = require('webpack');

module.exports = {  
  entry: './src/typescripts/index.ts',
  output: {
    filename: 'dist/bunnywars.js'
  },
  devtool: 'source-map',
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
