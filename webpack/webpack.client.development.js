const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const { client } = require('./common');

module.exports = merge(client, {
  entry: {
    bundle: ['webpack-hot-middleware/client']
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin({ filename: 'styles.css' })]
});
