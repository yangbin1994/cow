const path = require('path')

export default {
  entry: 'src/index.js',
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
    "transform-decorators-legacy",
    "lodash",
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
  },
  dllPlugin: {
    exclude: ["babel-runtime", 'docdash', 'babel-plugin-lodash'],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
