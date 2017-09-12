import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import * as services from 'services/media_search'
import { syncLocationModelMaker } from './common'
import modelExtend from 'dva-model-extend'


export default modelExtend(
  syncLocationModelMaker({
    defaultState: {
      // 平台
      pt: ['1'],
      // 资质
      zz: [],
    },
    pathname: '/media/search',
  }),
  {
    namespace: 'media_search',
    state: {
      // 搜索框异步素材内容
      kols: [],
      // 搜索框的值
      kolVal: '',
    },

    effects: {
      * fetchKols({ payload: value }, { put, call }) {
        const { success, data, } = yield call(services.kols)
        yield put({
          type: 'updateState',
          payload: {
            kols: data,
          },
        })
      },
    },

    reducers: {
      updateSearch(state, { payload: kolVal, }) {
        return {
          ...state,
          kolVal,
        }
      },
    },

  }
)
