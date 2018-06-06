/**
 * Created by TY-xie on 2018/6/4.
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

const resolve = dir => path.join(__dirname, '..', dir)
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
	bundle: './index.js'
  },
  output: {
	path: '../dist',
	filename: '[name].js',
	publicPath: '/'
  },
  resolve: {
	extensions: ['.js', '.vue', '.json'],
	alias: {
	  'components': resolve('src/components'),
	  'pages': resolve('src/pages'),
	  'vue$': 'vue/dist/vue.esm.js',
	  'styles': resolve('src/styles'),
	  'api': resolve('src/api'),
	  '@': resolve('src'),
	}
  },
  module: {
	rules: [
	  {
		test: /\.vue$/,
		loader: 'vue-loader',
		options: vueLoaderConfig
	  },
	  {
		test: /\.js$/,
		loader: 'babel-loader',
		include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/xui')]
	  },
	  {
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		loader: 'url-loader',
		options: {
		  limit: 10000,
		  name: utils.assetsPath('img/[name].[hash:7].[ext]')
		}
	  },
	  {
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		loader: 'url-loader',
		options: {
		  limit: 10000,
		  name: utils.assetsPath('media/[name].[hash:7].[ext]')
		}
	  },
	  {
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
		  limit: 10000,
		  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
		}
	  }
	]
  },
  node: {
	// prevent webpack from injecting useless setImmediate polyfill because Vue
	// source contains it (although only uses it if it's native).
	setImmediate: false,
	// prevent webpack from injecting mocks to Node native modules
	// that does not make sense for the client
	dgram: 'empty',
	fs: 'empty',
	net: 'empty',
	tls: 'empty',
	child_process: 'empty'
  }
}
