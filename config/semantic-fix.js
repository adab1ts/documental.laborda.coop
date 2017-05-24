/*
 * Webpack + Customizable Semantic UI 2.x (LESS)
 * See: https://www.artembutusov.com/webpack-semantic-ui/
 */
var fs = require('fs')
var helpers = require('./helpers.js')

// relocate default config
fs.writeFileSync(
  helpers.root('node_modules', 'semantic-ui-less', 'theme.config'),
 "@import '../../vendor/semantic/theme.config';\n",
 'utf8'
)

// fix well known bug with default distribution
fixPaths(helpers.root('node_modules', 'semantic-ui-less', 'themes', 'default', 'globals', 'site.variables'))
fixPaths(helpers.root('node_modules', 'semantic-ui-less', 'themes', 'flat', 'globals', 'site.variables'))
fixPaths(helpers.root('node_modules', 'semantic-ui-less', 'themes', 'material', 'globals', 'site.variables'))

function fixPaths (filename) {
  var content = fs.readFileSync(filename, 'utf8')
  var newContent = content
    .replace(
      "@imagePath : '../../themes/",
      "@imagePath : '../../../themes/"
    )
    .replace(
      "@fontPath  : '../../themes/",
      "@fontPath  : '../../../themes/"
    )
  fs.writeFileSync(filename, newContent, 'utf8')
}
