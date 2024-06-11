const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) =>({
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js',
        publicPath: '/',

    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            },
             {
              test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
              type: 'asset/resource',
             },

             {
                test: /\.scss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  env.prod ? MiniCssExtractPlugin.loader: 'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
              patterns: [
            {
              from: 'src/assets/images',
              to:   'src/images'
            }
          ]
        }),
        new HtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
      },
});