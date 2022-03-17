// TS + node modules
// Phaser + phixi + etc -> static
// css
// images

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/scripts/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Space Rabbits',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/assets", to: "./assets" }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
        extensions: ['.tsx', '.ts'],
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