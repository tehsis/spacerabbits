const webpack = require('webpack');
const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const target = process.env.TARGET || 'web';

let entry = ['./src/scripts/index.ts'];

if (target === 'cordova') {
  entry.push('cordova')
}
   
module.exports = {  
  entry: ['./src/scripts/index.ts'],
  output: {
    filename: 'scripts/bunnywars.js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.tsx'],
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2,
    }
  },
  externals: {
    "cordova": "cordova"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' },
        ]
      },
      {
        test: /(pixi\.js)|(p2\.js)|(phaser\.js)/, loader: 'script-loader'
      },
      {
        test: /\.less$/,
        use: [ 
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {url: false, sourceMap: true} },
          { loader: 'less-loader', options: {relativeUrls: false, sourceMap: true} } 
        ]
      }
    ]
  }
}
