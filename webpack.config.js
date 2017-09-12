const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = (webpackConfig, env) => {
  // when buildDll
  if (typeof webpackConfig.entry === 'object' && webpackConfig.entry.roadhog) {
    return webpackConfig
  }

  let production = env === 'production'
  let development = !production

  // // less resolver
  // // https://github.com/webpack-contrib/less-loader#less-resolver
  // if (webpackConfig.module) {
  //   webpackConfig.module.rules.forEach((item) => {
  //     if (String(item.test) === '/\\.less$/') {
  //       if (item.use) {
  //         const lessLoader = item.use.filter(it => it.loader === 'less')[0]
  //         const lessLoaderOpt = lessLoader.options || (lessLoader.options = {})
  //         lessLoaderOpt.paths = lessLoaderOpt.paths ? lessLoaderOpt.paths.concat([`${__dirname}/src`,]) : [`${__dirname}/src`,]
  //       }
  //       // console.log(item.use[item.use.length - 1].options)
  //     }
  //     return item
  //   })
  // }

  if (production) {
    // FilenameHash
    webpackConfig.output.chunkFilename = '[name].[hash].js'

    if (webpackConfig.module) {
      // ClassnameHash
      webpackConfig.module.rules.map((item) => {
        if (String(item.test) === '/\\.less$/' || item.test === '/\\.css/') {
          item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]'
        }
        return item
      })
    }
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }

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
      publicPath: webpackConfig.output.publicPath,
    }),
  ])

  // custom env
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH = webpackConfig.output.publicPath),
    })
  )

  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    services: `${__dirname}/src/services`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    svg: `${__dirname}/src/svg`,
    themes: `${__dirname}/src/themes`,
    assets: `${__dirname}/src/assets`,
  }

  return webpackConfig
}
