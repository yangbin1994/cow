import React from 'react'
import { Row, Col, } from 'antd'
import PreviewCard from './PreviewCard'
// 榜单指标
import Seniority from './Seniority'
// 质量指标
import Quality from './Quality'
// 用户画像
import Portrayal from './Portrayal'
// 合作记录
import PartnerRecord from './PartnerRecord'
// 相似账号
import SimilarityAccount from './SimilarityAccount'
// 文章详情
import Articles from './Articles'
// 词云
import WordClound from './WordClound'
import styles from './index.less'
import { Tabs, } from 'antd'

const TabPane = Tabs.TabPane


export default class Media_Type_Id extends React.Component {
  render = () => {

    return (
      <div>
        <PreviewCard {...this.props} />
        <Row style={{ marginTop: 20 }} gutter={20}>
          <Col span={12}>
            <Seniority />
          </Col>
          <Col span={12}>
            <Quality />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }} gutter={20}>
          <Col span={12}>
            <Portrayal />
          </Col>
          <Col span={12}>
            <PartnerRecord />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }} gutter={20}>
          <Col span={12}>
            <WordClound />
          </Col>
          <Col span={12}>
            <SimilarityAccount />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }} gutter={20}>
          <Col span={24}>
            <Articles />
          </Col>
        </Row>
      </div>
    )
  }
}
