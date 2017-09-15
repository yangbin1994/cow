import React from 'react'
import { Row, Col, } from 'antd'
// 榜单指标
import Seniority from './Seniority'
// 质量指标
import Quality from './Quality'
import styles from './index.less'

export default class extends React.Component {
  render = () => (
    <div>
      <Row style={{ marginTop: 20 }} gutter={20}>
        <Col span={12}>
          <Seniority />
        </Col>
        <Col span={12}>
          <Quality />
        </Col>
      </Row>
    </div>
  )
}
