const Mock = require('mockjs')
const { config } = require('./common')

const { apiPrefix } = config
let data = Mock.mock({
  'data|1-100': [
    {
      'name': '@word',
    }
  ]
})

module.exports = {

  [`GET ${apiPrefix}/kols`](req, res) {
    res.status(200).json(data)
  },
}
