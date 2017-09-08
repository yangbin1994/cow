const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: 'KOL选择',
  },
  {
    id: '11',
    mpid: '1',
    bpid: '1',
    name: '自媒体',
    route: '/media/search',
  },
  {
    id: '12',
    mpid: '1',
    bpid: '1',
    name: 'KOL对比',
    route: '/media/compare',
  },
  {
    id: '2',
    name: '监测',
    icon: 'user',
  },
  {
    id: '21',
    bpid: '2',
    mpid: '2',
    name: '投放监测',
    route: '/monitor/create',
  },
  {
    id: '22',
    mpid: '2',
    bpid: '2',
    name: '数据录入',
    route: '/monitor/entering',
  },
  {
    id: '3',
    name: '评价',
    icon: 'api',
  },
  {
    id: '31',
    mpid: '3',
    bpid: '3',
    name: '投放报告',
    route: '/monitor/reports',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`](req, res) {
    res.status(200).json(database)
  },
}
