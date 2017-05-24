const {PATHS} = require('./variables')
const glob = require('glob')

/*
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const CompressionPlugin = require('compression-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const MinChunkSizePlugin = require('webpack/lib/optimize/MinChunkSizePlugin')
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

/*
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production'

/*
 * Webpack production configuration
 * See: http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  /*
   * See:
   * - http://webpack.github.io/docs/configuration.html#devtool
   * - https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',

  /*
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    // See: http://webpack.github.io/docs/configuration.html#output-path
    path: PATHS.abs.dist,
    // See: http://webpack.github.io/docs/configuration.html#output-filename
    filename: `${PATHS.rel.scripts}/[name].[chunkhash:8].js`,
    // See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
    sourceMapFilename: '[file].map',
    // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
    chunkFilename: `${PATHS.rel.scripts}/[id].[chunkhash:8].js`,
    // See: http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: '/'
  },

  /*
   * See: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    // See: https://gist.github.com/sokra/27b24881210b56bbaff7
    // See: https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true,
      options: {
        postcss: [
          require('autoprefixer')(),
          require('postcss-discard-comments')({removeAll: true})
        ]
      }
    }),

    // See: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),

    // See: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new NoErrorsPlugin(),

    // See: https://blog.madewithlove.be/post/webpack-your-bags/
    // See: https://egghead.io/courses/using-webpack-for-production-javascript-applications
    // See: https://github.com/webpack/docs/wiki/code-splitting
    // See: https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: ['common', 'vendor', 'main'].reverse()
    }),

    // See: http://webpack.github.io/docs/list-of-plugins.html#minchunksizeplugin
    new MinChunkSizePlugin({
      minChunkSize: 50 * 1000
    }),

    // See: https://github.com/webpack/extract-text-webpack-plugin
    // See: https://webpack.js.org/guides/migrating/#extracttextwebpackplugin-breaking-change
    new ExtractTextPlugin({
      filename: `${PATHS.rel.styles}/[name].[contenthash:8].css`
    }),

    // See: https://github.com/webpack-contrib/purifycss-webpack
    // See: https://github.com/webpack-contrib/purifycss-webpack/blob/master/examples/webpack.config.js
    // See: https://github.com/purifycss/purifycss
    // See: http://survivejs.com/webpack/handling-styles/eliminating-unused-css/
    new PurifyCSSPlugin({
      verbose: true,
      minimize: true,
      paths: glob.sync(`${PATHS.abs.src}/*`)
    }),

    // See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // See: https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
    new UglifyJsPlugin({
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true, warnings: false },
      sourceMap: true,
      beautify: false,
      comments: false
    }),

    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // See: https://github.com/webpack/compression-webpack-plugin
    new CompressionPlugin({
      test: /\.css$|\.html$|\.ico$|\.js$|\.json$/
    })
  ]
}
