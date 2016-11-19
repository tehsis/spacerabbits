var webpack = require('webpack');
var path = require('path');

var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');
  
module.exports = {  
  entry: './src/scripts/index.ts',
  output: {
    filename: 'dist/scripts/bunnywars.js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    }
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /pixi.js/, loader: "script" },
      { test: /p2.js/, loader: "script" },
      { test: /phaser.js/, loader: "script" }

    ]
  }
}
