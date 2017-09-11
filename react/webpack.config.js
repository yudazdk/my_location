const webpack = require('webpack');

var config = {
    entry: './main.js',

    output: {
        path: './',
        filename: '../js/index.js',
    },
    devtool: "cheap-module-source-map",
    devServer: {
        inline: true,
        port: 8080,
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    }
}
module.exports = config;