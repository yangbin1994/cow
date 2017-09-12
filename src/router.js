import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes/app'
import { Loader } from 'components'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  // const routes = [
  //
  // {
  //   path: '*',
  //   component: dynamic({
  //     app,
  //     component: import('./routes/error'),
  //   }),
  // },
  // {
  //   path: 'user/:id',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },

  // {
  //   path: 'media/search',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },

  // {
  //   path: 'media/weixin/:id',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'media/toutiao/:id',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'media/compare',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'media/compare/reports',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'monitor/create',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'monitor/entering',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'monitor/change',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  // {
  //   path: 'monitor/search',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },
  //   path: 'monitor/search',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/login'))
  //       cb(null, require('./routes/Login/'))
  //     }, 'login')
  //   },
  // },

  // ]

  // const login = dynamic({
  //   app,
  //   models: () => [
  //     require('./models/login'),
  //   ],
  //   component: () => import('./routes/Login'),
  // })

  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })

  const routes = [
    {
      path: '/login',
      models: () => [
        import('./models/login'),
      ],
      component: () => import('./routes/login'),
    },
    {
      path: '/dashboard',
      models: () => [
        import('./models/dashboard'),
      ],
      component: () => import('./routes/dashboard')
    },
    {
      path: '/media/search',
      models: () => [
        import('./models/media_search'),
      ],
      component: () => import('./routes/media_search')
    },
    {
      path: '/media/:type/:id',
      models: () => [
        import('./models/media_type_id'),
      ],
      component: () => import('./routes/media_type_id')
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path='/' render={() => (<Redirect to='/dashboard' />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key} exact path={path} component={dynamic({
                app,
                LoadingComponent: ({ productId }) => (<Loader spinning />),
                ...dynamics
              })} />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
