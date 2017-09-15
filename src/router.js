import React from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {

  return (
    <ConnectedRouter history={history}>
      <Route component={dynamic({
        app,
        models: () => [
          import('./models/media_type_id'),
        ],
        component: () => import('./routes/media_type_id'),
      })} />
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
