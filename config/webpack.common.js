const {PATHS} = require('./variables')

/*
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
      vendor: PATHS.abs.vendor,
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
      // See: https://github.com/webpack/exports-loader
      // See: https://egghead.io/lessons/tools-import-a-non-es6-module-with-webpack
      {
        test: require.resolve('hammerjs/hammer'),
        use: ['exports-loader?Hammer']
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
        test: /\.(png|svg|ico)$/i,
        include: [PATHS.abs.icons],
        use: [
          { loader: 'file-loader', options: { name: `${PATHS.rel.icons}/[name].[ext]` } },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optimizationLevel: 3,
              pngquant: { quality: '20-50' }
            }
          }
        ]
      },
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
      // See: https://www.zachleat.com/web/web-font-data-uris/
      // See: https://www.zachleat.com/web/preload/
      // See: http://www.bramstein.com/writing/preload-hints-for-web-fonts.html
      {
        test: /\.(eot|otf|ttf|svg|woff|woff2)$/,
        include: [PATHS.abs.fonts, PATHS.abs.vendor, PATHS.abs.mods.semantic],
        loader: 'file-loader',
        options: { name: `${PATHS.rel.fonts}/[name].[hash:8].[ext]` }
      },
      // See: https://github.com/webpack/html-loader
      // See: https://github.com/kangax/html-minifier
      // This works => use: [`html-loader?${JSON.stringify({ attrs: ['link:href', 'img:src', 'img:data-src'] })}`]
      {
        test: /\.html$/,
        include: PATHS.abs.src,
        use: ['html-loader?attrs=link:href img:src img:data-src']
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
    })
  ]
}
