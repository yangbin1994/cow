import React from 'react'
import { Icon, } from 'antd'

export const RankCop = ({ num, preText, }) => {
  if (num > 0) {
    return (<span>{preText}{num}<Icon type="arrow-up" /></span>)
  } else if (num < 0) {
    return (<span>{preText}{-num}<Icon type="arrow-down" /></span>)
  } else {
    return (<span>{preText}{num}<Icon type="swap" /></span>)
  }
}
