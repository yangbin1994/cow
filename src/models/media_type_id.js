import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'


export default modelExtend(
  {
    namespace: 'PreviewCard',

    state: {
      // PreviewCard
      userData: {
        headimgurl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name: '乳制品专家',
        id: 455554,
        // 负数就是下降排名
        ranking: 2,
        fansNum: 234523,
        identify: 1,
        teamworkNum: 4,
        starts: 3,
        grade: 98,
        black: true,
      },
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
  },
  {
    namespace: 'Seniority',

    state: {
      seniorityData: {
        // 总排名
        mainRanking: 3,
        // 次排名
        minorRanking: -2,
      }
    },
  },
  {
    // 质量
    namespace: 'Quality',
  },
  {
    // 用户画像
    namespace: 'Portrayal',
  },
  {
    // 合作记录
    namespace: 'PartnerRecord',
  },
  {
    // 词云
    namespace: 'WordClound',
  },
  {
    // 相似账号
    namespace: 'SimilarityAccount',
  },
  {
    // 文章详情
    namespace: 'Articles',
  },
  {
    namespace: 'media_type_id',
  }
)
