const {PATHS} = require('./variables')

/*
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')

/*
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development'

/*
 * Webpack development configuration
 * See: http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  /*
   * See:
   * - http://webpack.github.io/docs/configuration.html#devtool
   * - https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'cheap-module-source-map',

  /*
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    // See: http://webpack.github.io/docs/configuration.html#output-path
    path: PATHS.abs.dist,
    // See: http://webpack.github.io/docs/configuration.html#output-filename
    filename: `${PATHS.rel.scripts}/[name].bundle.js`,
    // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
    sourceMapFilename: `${PATHS.rel.scripts}/[name].map`,
    // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
    chunkFilename: `${PATHS.rel.scripts}/[id].chunk.js`,
    // See: http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: '/',
    // See: http://webpack.github.io/docs/configuration.html#output-pathinfo
    pathinfo: true
  },

  /*
   * See: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    // See: http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'common',
      filename: `${PATHS.rel.scripts}/common.bundle.js`
    }),

    // See: http://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),

    // See: https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin(`${PATHS.rel.styles}/[name].bundle.css`),

    // See: https://gist.github.com/sokra/27b24881210b56bbaff7
    new LoaderOptionsPlugin({
      options: {
        // PostCSS plugins
        // See:
        // - https://github.com/jonathantneal/precss
        // - https://github.com/postcss/autoprefixer
        // - https://github.com/hail2u/node-css-mqpacker
        // - https://github.com/ben-eb/postcss-discard-comments
        postcss: [
          require('autoprefixer')({ browsers: ['defaults', 'ie 9'] })
        ]
      }
    })
  ]

  /*
   * Webpack Development Server configuration
   * See:
   * - https://webpack.github.io/docs/webpack-dev-server.html
   * - https://webpack.js.org/configuration/dev-server/
   */
  // devServer: {
  //   contentBase: PATHS.abs.dist,
  //   port: 8080,
  //   stats: 'minimal',
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   }
  // }
}
