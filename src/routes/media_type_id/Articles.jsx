import React from 'react'
import PreviewCard from './PreviewCard'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Card, Col, Tabs, } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { DataTable } from 'components'

const TabPane = Tabs.TabPane

@connect(
  ({ media_type_id: { WordClound, } }) => ({ ...WordClound, })
)
export default class extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  render = () => {
    const fetchDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
        },
        dataKey: 'results',
      },
      pagination: {
        pageSize: 5,
        size: 'small',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: text => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    }

    return (
      <Card title='文章详情'>
        <Tabs defaultActiveKey="1">
          <TabPane tab={'最近发布'} key="1">
            <DataTable {...fetchDataTableProps} />
          </TabPane>
          <TabPane tab={'最多转发top5'} key="2">
            <DataTable {...fetchDataTableProps} />
          </TabPane>
          <TabPane tab={'最多评论top5'} key="3">
            <DataTable {...fetchDataTableProps} />
          </TabPane>
          <TabPane tab={'最多点赞top5'} key="4">
            <DataTable {...fetchDataTableProps} />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}
