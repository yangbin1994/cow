import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Icon, Tooltip, Button, } from 'antd'
import { DataTableLocalState, LinkWrapper, } from 'components'
import { config } from 'utils'
import styles from './index.less'

const Tip = ({ title, tip }) => (
  <span>
    {title}&nbsp;
    <Tooltip title={tip}>
      <Icon type="question-circle-o" />
    </Tooltip>
  </span>
)

@connect()
export default class Table extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    className: PropTypes.string,
  }

  render = () => {
    const { dispatch, } = this.props

    const dataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
        },
        dataKey: 'results',
      },
      scroll: { x: 1500, },
      columns: [
        {
          title: '序号',
          dataIndex: 'name',
          render: text => `test`,
        },
        { title: '账号名称', dataIndex: 'phone', },
        { title: '平台', dataIndex: 'gender', },
        {
          title: (<Tip title='真实性' tip='阿斯顿发斯蒂芬就' />),
          dataIndex: '1', render: text => 'test',
        },
        {
          title: (<Tip title='综合评分' tip='阿斯顿发斯蒂芬就' />),
          dataIndex: '2', render: text => 'test',
        },
        {
          title: (<Tip title='活跃度' tip='阿斯顿发斯蒂芬就' />),
          dataIndex: '3', render: text => 'test',
        },
        {
          title: (<Tip title='匹配度' tip='阿斯顿发斯蒂芬就' />),
          dataIndex: '4', render: text => 'test',
        },
        {
          title: (<Tip title='评价' tip='阿斯顿发斯蒂芬就' />),
          dataIndex: '5', render: text => 'test',
        },
        {
          fixed: 'right',
          width: 200,
          title: '操作',
          dataIndex: '6',
          render: () => (
            <LinkWrapper to={`/media/${'weibo'}/${123}`}>详情</LinkWrapper>
          ),
        },
      ],
      rowKey: 'registered',
    }

    return (
      <div className={this.props.className}>
        <DataTableLocalState
          {...dataTableProps}
        />
      </div>
    )
  }
}
