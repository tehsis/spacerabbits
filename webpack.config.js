const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const phaserModule = path.join(__dirname, './node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    mode: 'production',
    entry: ['./src/scripts/index.ts', './src/styles/index.css'],
    devtool: false,
    optimization: {
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Alberto War',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: "./src/assets", 
                    to: "./assets" 
                }
            ]
        }),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(ico|png|svg|wav|mp3)$/,
                type: 'asset/resource'
            },
            { 
                test: /pixi\.js/,
                loader: 'expose-loader',
                options: {
                    exposes: 'PIXI'
                }
            },
            { 
                test: /phaser-split\.js$/,
                loader: 'expose-loader',
                options: {
                    exposes: 'Phaser'
                }
            },
            { 
                test: /p2\.js/,
                loader: 'expose-loader',
                options: {
                    exposes: 'p2'
                }
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'Phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
};