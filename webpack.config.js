const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  // when buildDll
  if (typeof webpackConfig.entry === 'object' && webpackConfig.entry.roadhog) {
    return webpackConfig
  }

  let production = env === 'production'
  let development = !production

  // ejs loader
  // first loader is file-loader
  webpackConfig.module.rules[0].exclude.push(/\.ejs$/)
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new HtmlWebpackPlugin({
      hash: true,
      production,
      development,
      template: `ejs!src/index.ejs`,
      minify: production ? { collapseWhitespace: true } : undefined,
      publicPath: webpackConfig.output.publicPath
    }),
  ])

  // custom env
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH = webpackConfig.output.publicPath),
      'process.env.API_ENV': JSON.stringify(process.env.API_ENV = process.env.API_ENV)
    })
  )

  // FilenameHash
  if (production) {
    webpackConfig.output.chunkFilename = '[name].[hash].js'
  }

  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    svg: `${__dirname}/src/svg`,
  }

  return webpackConfig
}
