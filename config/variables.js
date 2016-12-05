const helpers = require('./helpers')

/*
 * Constants & Variables
 */
const PATHS = {
  abs: {
    src: helpers.root('src'),
    dist: helpers.root('dist'),
    fonts: helpers.root('src', 'assets', 'fonts'),
    images: helpers.root('src', 'assets', 'images'),
    scripts: helpers.root('src', 'assets', 'scripts'),
    styles: helpers.root('src', 'assets', 'styles'),
    vendor: helpers.root('vendor'),
    mods: {
      semantic: helpers.root('node_modules', 'semantic-ui-less')
    }
  },
  rel: {
    fonts: 'assets/fonts',
    images: 'assets/images',
    scripts: 'assets/scripts',
    styles: 'assets/styles'
  }
}

exports.PATHS = PATHS
