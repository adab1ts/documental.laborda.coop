const {PATHS} = require('./variables')

/*
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')

/*
 * Webpack common configuration
 * See:
 * - https://gist.github.com/sokra/27b24881210b56bbaff7
 * - http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  /*
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'main': './src',
    'vendor': './vendor'
  },

  /*
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    // See: https://gist.github.com/sokra/27b24881210b56bbaff7#resolving-options
    modules: ['node_modules'],
    // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
    extensions: ['.js'],
    // See: http://webpack.github.io/docs/configuration.html#resolve-alias
    alias: {
      fonts: PATHS.abs.fonts,
      images: PATHS.abs.images,
      scripts: PATHS.abs.scripts,
      styles: PATHS.abs.styles
    }
  },

  /*
   * See:
   * - http://webpack.github.io/docs/configuration.html#module
   * - https://webpack.github.io/docs/list-of-loaders.html
   */
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules/
        ]
      },
      // See: https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        include: PATHS.abs.src,
        loader: 'babel-loader'
      },
      // See: https://github.com/webpack/css-loader
      // See: https://github.com/postcss/postcss-loader
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      // See: https://github.com/webpack/less-loader
      {
        test: /\.less$/,
        include: [PATHS.abs.src, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader', 'less-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      // See: https://github.com/webpack/html-loader
      // See: https://github.com/kangax/html-minifier
      {
        test: /\.html$/,
        include: PATHS.abs.src,
        loader: 'html-loader'
      },
      // See: http://survivejs.com/webpack/loading-assets/loading-images/
      // See: https://github.com/webpack/file-loader
      // See: https://github.com/webpack/url-loader
      // See: https://github.com/tcoopman/image-webpack-loader
      // See: https://github.com/kavu/webp-loader
      // See: https://developers.google.com/speed/webp/
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: [PATHS.abs.src, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loaders: [
          { loader: 'url-loader', query: { limit: 10 * 1024, name: `${PATHS.rel.images}/[name].[hash:21].[ext]` } },
          { loader: 'image-webpack-loader', query: { bypassOnDebug: true, optimizationLevel: 7, progressive: true, interlaced: true } }
        ]
      },
      {
        test: /\.(otf|woff|ttf|svg)$/,
        include: [PATHS.abs.src, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: 'url-loader',
        query: { limit: 10 * 1024, name: `${PATHS.rel.fonts}/[name].[hash:21].[ext]` }
      },
      {
        test: /\.woff2$/,
        include: [PATHS.abs.src, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: 'url-loader',
        query: { limit: 10 * 1024, mimetype: 'font/woff2', name: `${PATHS.rel.fonts}/[name].[hash:21].[ext]` }
      },
      {
        test: /\.eot$/,
        include: [PATHS.abs.src, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: 'file-loader',
        query: { name: `${PATHS.rel.fonts}/[name].[hash:21].[ext]` }
      }
    ]
  },

  /*
   * See: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    // See: https://blog.madewithlove.be/post/webpack-your-bags/
    // See: https://egghead.io/courses/using-webpack-for-production-javascript-applications
    // See: https://github.com/webpack/docs/wiki/code-splitting
    // See: https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: ['vendor', 'main'].reverse()
    }),

    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    // See: https://github.com/clessg/progress-bar-webpack-plugin
    new ProgressBarPlugin(),

    // See: https://webpack.github.io/docs/list-of-plugins.html#provideplugin
    new ProvidePlugin({
      jQuery: 'jquery'
    })
  ]
}
