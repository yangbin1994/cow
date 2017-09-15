import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'

export default modelExtend(
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
    namespace: 'media_type_id',
  },
)
