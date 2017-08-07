const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, '/src/svg'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  // 接口代理示例
  // "proxy": {
  //   "/api/v1": {
  //     "target": "http://api.zuiidea.com",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api/v1" : "/v1" }
  //   },
  //   "/api/v2": {
  //     "target": "http://192.168.0.110",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api/v2" : "/api/v2" }
  //   }
  // },
  "extraBabelPlugins": [
    "transform-runtime",
    [
      "import", {
        "libraryName": "antd",
        "style": true
      }
    ]
  ],
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
      ],
    },
    production: {
      "publicPath": 'http://106.14.174.157/'
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
