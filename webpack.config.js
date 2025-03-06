
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',

    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        code: './src/code.ts',
        ui: './src/ui.tsx',
    },
    output: {
        filename: (pathData) => {
            return pathData.chunk.name === 'code'
                ? 'code.js'
                : '[name].[contenthash].js';
        },
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            global: {},
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/ui.html',
            filename: 'ui.html',
            chunks: ['ui'],
        }),
        new HtmlInlineScriptPlugin({
            htmlMatchPattern: [/ui.html/],
            scriptMatchPattern: [/.js$/],
        }),
        new miniCssExtractPlugin({
            filename: '[name].css',
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
            }
        ]
    }
});