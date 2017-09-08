import { request, config, } from 'utils'

const { apiPrefix, } = config

export async function kols(params) {
  return request({
    url: `${apiPrefix}/kols`,
    method: 'get',
  })
}
