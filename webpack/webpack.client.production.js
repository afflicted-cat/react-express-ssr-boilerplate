const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const { cpus } = require('os');

const { client } = require('./common');

module.exports = merge(client, {
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: cpus().length,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          }
        }
      })
    ]
  },
  plugins: [
    new ManifestPlugin({ fileName: 'asset-manifest.json' }),
    new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' })
  ]
});
