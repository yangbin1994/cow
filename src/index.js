import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import createHistory from 'history/createBrowserHistory'
import 'babel-polyfill'
import 'echarts-wordcloud'
import echarts from 'echarts'

import { Tabs, } from 'antd'

const TabPane = Tabs.TabPane

echarts.registerMap('china', require('assets/china'))


const app = window.app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError(error) {
    message.error(error.message)
  },
})

// 2. Model
// app.model(require('./models/login'))
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
