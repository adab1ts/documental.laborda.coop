const {PATHS} = require('./variables')

/*
 * Webpack Plugins
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    // See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
    sourceMapFilename: '[file].map',
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
    // See: https://gist.github.com/sokra/27b24881210b56bbaff7
    new LoaderOptionsPlugin({
      debug: true,
      options: {
        // PostCSS plugins
        // See:
        // - https://github.com/jonathantneal/precss
        // - https://github.com/postcss/autoprefixer
        // - https://github.com/hail2u/node-css-mqpacker
        // - https://github.com/ben-eb/postcss-discard-comments
        postcss: [
          require('autoprefixer')()
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

    // See: https://blog.madewithlove.be/post/webpack-your-bags/
    // See: https://egghead.io/courses/using-webpack-for-production-javascript-applications
    // See: https://github.com/webpack/docs/wiki/code-splitting
    // See: https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new CommonsChunkPlugin({
      name: ['common', 'vendor', 'main'].reverse()
    }),

    // See: https://github.com/webpack/extract-text-webpack-plugin
    // See: https://webpack.js.org/guides/migrating/#extracttextwebpackplugin-breaking-change
    new ExtractTextPlugin({
      filename: `${PATHS.rel.styles}/[name].bundle.css`
    }),

    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'src/index.html'
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
