/*
 * Webpack resources
 * See:
 * - https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.6p4uheu73
 * - https://blog.madewithlove.be/post/webpack-your-bags/
 * - https://egghead.io/courses/using-webpack-for-production-javascript-applications
 * - https://angular.io/docs/ts/latest/guide/webpack.html
 * - https://gist.github.com/sokra/27b24881210b56bbaff7
 */
const commonConfig = require('./config/webpack.common.js')
const merge = require('webpack-merge') // used to merge webpack configs

module.exports = (env) => {
  if (env.dev) {
    let config = require('./config/webpack.dev.js')
    return merge(commonConfig, config)
  }

  if (env.prod) {
    let config = require('./config/webpack.prod.js')
    return merge(commonConfig, config)
  }
}
