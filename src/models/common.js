import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import qs from 'query-string'
import _ from 'lodash'

const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const syncLocationModelMaker = (options) => {

  const {
    domain = 'locationState',
    pathname,
    defaultState,
  } = options

  if (!pathname) {
    throw new Error('pathname must be exist')
  }

  return modelExtend(model, {

    effects: {
      * mergeLocationState({ payload: state, }, { call, put, }) {
        yield put(routerRedux.push({
          pathname: location.pathname,
          search: qs.stringify(
            _.extend(qs.parse(location.search), state)
          )
        }))
      },
      * updateLocationState({ payload: state, }, { call, put, }) {
        console.log(state)
        yield put(routerRedux.replace({
          pathname: location.pathname,
          search: qs.stringify(state)
        }))
      },
    },

    reducers: {
      syncLocationState(state, { payload, }) {
        return {
          ...state,
          [domain]: payload,
        }
      },
    },

    subscriptions: {
      $setup({ history, dispatch }) {
        let $defaultState = defaultState
        /**
         * prePathname刚开始设置的是undefined，也更符合语义（浏览器刷新
         * 的时候，上一个页面是未知），但是出现了一个问题：
         * 按照逻辑会进入curPathname !== prePathname的分支，
         * 派发updateLocationState的action，接着触发history.listen的回调，
         * 这次进入的就是curPathname === prePathname分支，同步state，但是并没有接着触发
         * history.listen，updateLocationState里面的routerRedux.replace感觉有问题
         */
        let prePathname;
        // let prePathname = location.pathname;
        let preQuery;

        history.listen(({ pathname: curPathname, search: curSearch, }) => {
          console.log('location chg')
          let curQuery = qs.parse(location.search)
          if (curPathname === pathname) {
            if (curPathname === prePathname) {
              console.log('curPathname === prePathname', curPathname, prePathname)
              dispatch({
                type: 'syncLocationState',
                payload: curQuery,
              })
            } else {
              console.log('curPathname !== prePathname', curPathname, prePathname)
              /**
               * 这里则是某一次进入分支的逻辑，在dispatch之后，并没有接着往下执行，
               * 因此prePathname = curPathname这个语句，我不得不放到上面，幸好
               * dispath不依赖它
               */
              setTimeout((function (curQuery, preQuery) {
                return () => dispatch({
                  type: 'updateLocationState',
                  payload: _.extend($defaultState, curQuery, preQuery),
                })
              })(curQuery, preQuery))
            }
            preQuery = curQuery
          }
          prePathname = curPathname
        })
      },
    }

  })
}

const syncFormModel = modelExtend(model, {

  reducers: {
    mergeFormData(state, { payload }) {
      return {
        ...state,
        formData: {
          ...state.formData,
          ...payload,
        }
      }
    },
  },

})

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Items`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
  syncLocationModelMaker,
}
