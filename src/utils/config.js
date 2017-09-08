const PUBLIC_PATH = process.env.PUBLIC_PATH
const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  prefix: 'antdAdmin',
  name: 'AntD Admin',
  logo: `${PUBLIC_PATH}logo.png`,
  footerText: '版权所有 © 2017 由 Target Social 数据平台组提供技术支持',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: APIV1,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
