/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { YQL, CORS } from './config'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
      })
    case 'delete':
      return axios.delete(url, {
        data: data,
      })
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request(options) {

  return fetch(options).then((response) => {
    let { statusText, status, data, } = response
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
