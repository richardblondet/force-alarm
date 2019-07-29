/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV || "development";
const pkg = require('./package.json');

let libraryName = 'force-alarm-public';
let watch;

let outputFile;
if (env === "development") {
    outputFile = libraryName + '.js';
    watch = true;
} else {
    outputFile = libraryName + '.min.js';
    watch = false;
}

const config = {
    mode: env,
    entry: __dirname + '/.src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/js',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (process.env.NODE_ENV === 'development') {
                                return '[path][name].[ext]';
                            }
                            
                            return '[hash].[ext]';
                        }
                    }
                }]
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['*', '.js', '.jsx']
    },
    // watch: watch,
    devServer: {
        // contentBase: './',
        after: function(app, server) {
            console.log("Server", server);
        }
    }
};

module.exports = config;