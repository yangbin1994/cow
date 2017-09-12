import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Tag, Row, Col, Card, Avatar, Icon, Rate, } from 'antd'
import { RankCop, } from './components'
import { config } from 'utils'
import styles from './PreviewCard.less'


@connect(
  ({ media_type_id: { userData, } }) => ({ userData, })
)
export default class PreviewCard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    userData: PropTypes.object,
  }


  render = () => {
    const { dispatch, userData, match: { params: { type, id, }, } } = this.props
    console.log(this.props)

    const idText = {
      'weibo': 'UID',
      'weixin': 'ID',
      'toutiao': '主页',
    }

    const fansText = {
      'weibo': '真实粉丝数',
      'weixin': '平均真实阅读',
      'toutiao': '粉丝数',
    }

    const identifyText = {
      'weibo': '身份认证',
      'weixin': '资质',
      'toutiao': '资质',
    }

    const identifyVals = {
      '1': '企业认证用户',
      '2': '企业认证',
    }

    if (type === 'toutiao') {
      userData.id = (
        <a href={userData.id}>点击前往</a>
      )
    }

    return (
      <div className={styles.PLACEHOLDER}>
        <Card>
          <Row type='flex' justify='space-around'>
            <Col className={styles.left}>
              <img src={userData.headimgurl} alt="" />
            </Col>
            <Col>
              <h2>{userData.name}</h2>
              <p>{idText[type]}:{userData.id}</p>
              <p><RankCop preText='与上周相比:' num={userData.ranking} /></p>
            </Col>
            <Col>
              <p>{fansText[type]}:{userData.fansNum}</p>
              <p>{identifyText[type]}:{identifyVals[userData.identify]}</p>
              <p>合作次数:{userData.teamworkNum}</p>
              <Rate disabled defaultValue={userData.starts} />
            </Col>
            <Col className={styles['icon-wrapper']}>
              <div className={styles.icon}>
                <Icon type="folder-add" />
                <span>加入项目</span>
              </div>
              <div className={styles.icon}>
                <Icon type="pushpin-o" />
                <span>加入对比</span>
              </div>
              <div className={styles.icon}>
                <Icon type="heart" />
                <span>加入收藏</span>
              </div>
            </Col>
            <Col className={styles.grade}>
              <span>综合评分:{userData.grade}</span>
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }} type='flex' justify='space-between' align='middle'>
            <div>
              标签: &nbsp;<Tag color="#f50">#f50</Tag>
              <Tag color="#2db7f5">#2db7f5</Tag>
              <Tag color="#87d068">#87d068</Tag>
              <Tag color="#108ee9">#108ee9</Tag>
            </div>
            {
              userData.black && (
                <div>
                  已加入黑名单<Icon type="dislike-o" />
                </div>
              )
            }
          </Row>
        </Card>
      </div>
    )
  }
}
