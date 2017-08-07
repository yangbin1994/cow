const PUBLIC_PATH = process.env.PUBLIC_PATH
const API_ENV = process.env.API_ENV
const APIV1 = API_ENV || '/api/v1'
const APIV2 = API_ENV || '/api/v2'

module.exports = {
  prefix: 'antdAdmin',
  name: 'AntD Admin',
  logo: `${PUBLIC_PATH}logo.png`,
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
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
