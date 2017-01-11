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
 * - https://webpack.js.org/guides/migrating/
 * - https://webpack.js.org/configuration/
 */
module.exports = {
  /*
   * See: https://webpack.js.org/configuration/entry-context/
   */
  entry: {
    'main': './src',
    'vendor': './vendor'
  },

  /*
   * See:
   * - https://webpack.js.org/concepts/module-resolution/
   * - https://webpack.js.org/configuration/resolve/
   */
  resolve: {
    // See: https://webpack.js.org/configuration/resolve/#resolve-modules
    modules: ['node_modules'],
    // See: https://webpack.js.org/configuration/resolve/#resolve-extensions
    extensions: ['.js'],
    // See: https://webpack.js.org/configuration/resolve/#resolve-alias
    // See: https://medium.com/webpack/how-to-cope-with-broken-modules-in-webpack-4c0427fb23a#.s5hya32io
    alias: {
      fonts: PATHS.abs.fonts,
      images: PATHS.abs.images,
      scripts: PATHS.abs.scripts,
      styles: PATHS.abs.styles,
      jquery: 'jquery/src/jquery'
    }
  },

  /*
   * See:
   * - https://webpack.js.org/configuration/module/
   * - https://webpack.github.io/docs/list-of-loaders.html
   */
  module: {
    // See: https://webpack.js.org/guides/migrating/#module-loaders-is-now-module-rules
    rules: [
      // See: https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        include: PATHS.abs.src,
        use: ['babel-loader']
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
        include: [PATHS.abs.styles, PATHS.abs.vendor, PATHS.abs.mods.opencolor, PATHS.abs.mods.semantic],
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'postcss-loader', 'less-loader'],
          fallbackLoader: 'style-loader'
        })
      },
      // See: http://survivejs.com/webpack/loading-assets/loading-images/
      // See: https://github.com/webpack/file-loader
      // See: https://github.com/webpack/url-loader
      // See: https://github.com/tcoopman/image-webpack-loader
      // See: https://github.com/kavu/webp-loader
      // See: https://developers.google.com/speed/webp/
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: [PATHS.abs.images, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        use: [
          { loader: 'url-loader', options: { limit: 10 * 1000, name: `${PATHS.rel.images}/[name].[hash:8].[ext]` } },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 3,
              progressive: true,
              interlaced: true,
              pngquant: { quality: '20-50' },
              mozjpeg: { quality: 65 }
            }
          }
        ]
      },
      {
        test: /\.woff2$/,
        include: [PATHS.abs.fonts, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        use: ['url-loader'],
        options: { limit: 10 * 1000, mimetype: 'font/woff2', name: `${PATHS.rel.fonts}/[name].[hash:8].[ext]` }
      },
      {
        test: /\.(eot|otf|ttf|svg|woff)$/,
        include: [PATHS.abs.fonts, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: 'file-loader',
        options: { name: `${PATHS.rel.fonts}/[name].[hash:8].[ext]` }
      },
      // See: https://github.com/webpack/html-loader
      // See: https://github.com/kangax/html-minifier
      {
        test: /\.html$/,
        include: PATHS.abs.src,
        use: ['html-loader']
      }
    ]
  },

  /*
   * See: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    // See: https://github.com/clessg/progress-bar-webpack-plugin
    new ProgressBarPlugin(),

    // See: https://webpack.github.io/docs/list-of-plugins.html#provideplugin
    // See: https://medium.com/webpack/how-to-cope-with-broken-modules-in-webpack-4c0427fb23a#.s5hya32io
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

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
      template: 'src/index.html'
    })
  ]
}
