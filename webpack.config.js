const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getFileName = (ext) => ( isProd ? `bundle.[hash].${ext}` : `bundle.${ext}` );

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.ts'],
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            'presets': [
              ['@babel/preset-env', { 'targets': '>  0.25%, not dead' }],
              ['@babel/preset-typescript', { 'allExtensions': true, 'isTSX': true }],
            ]
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
    }
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 7000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname,'src/favicon.ico'),
          to: path.resolve(__dirname,'dist')
        },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: getFileName('css'),
    }),
  ],
};
