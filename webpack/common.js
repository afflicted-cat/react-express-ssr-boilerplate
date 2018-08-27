const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const HappyPack = require('happypack');
const merge = require('webpack-merge');
const webpack = require('webpack');
const paths = require('./paths');
const { cpus } = require('os');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';
const publicPath = '/';

const common = {
  mode: NODE_ENV,
  context: paths.root,
  output: {
    publicPath,
    path: paths.dist
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['module', 'browser', 'main']
  },
  module: {
    rules: [
      /** eslint */
      {
        enforce: 'pre',
        test: /\.m?jsx?$/,
        loader: 'eslint-loader',
        include: [paths.client, paths.server]
      },
      /** m?jsx */
      {
        test: /\.m?jsx?$/,
        loader: 'happypack/loader',
        include: [paths.client, paths.server]
      }
    ]
  },
  plugins: [
    new HappyPack({
      threads: cpus().length,
      loaders: ['babel-loader?cacheDirectory']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  stats: {
    colors: true,
    modules: false,
    children: false
  },
  performance: {
    hints: false
  }
};

const client = merge(common, {
  target: 'web',
  entry: {
    bundle: ['isomorphic-fetch', './client/index']
  },
  module: {
    rules: [
      {
        oneOf: [
          /** styles */
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  minimize: isProduction,
                  sourceMap: isProduction
                }
              }
            ]
          },
          /** images */
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              context: paths.root,
              name: 'assets/[name].[hash:8].[ext]'
            }
          },
          /** other */
          {
            exclude: [/\.m?e?jsx?$/, /\.html$/, /\.json$/, /\.css$/],
            loader: 'file-loader',
            options: {
              context: paths.root,
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dgram: 'empty',
    child_process: 'empty'
  }
});

const server = merge(common, {
  target: 'node',
  entry: {
    index: ['./server/index']
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  }
});

module.exports = {
  client,
  server,
  isProduction,
  isDevelopment
};
