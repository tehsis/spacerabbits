const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const target = process.env.TARGET || 'web';
   
module.exports = {  
  entry: './src/scripts/index.ts',
  output: {
    filename: 'scripts/bunnywars.js'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./styles/style.css",
    }),
    new HtmlWebpackPlugin({
      target,
      hash: true,
      minify: true,
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([ {from: './src/assets', to: './assets'} ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
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
          { loader: MiniCssExtractPlugin.loader, options: {publicPath: './styles'} },
          { loader: 'css-loader', options: {url: false, sourceMap: true} },
          { loader: 'less-loader', options: {relativeUrls: false, sourceMap: true} } 
        ]
      }
    ]
  }
}
