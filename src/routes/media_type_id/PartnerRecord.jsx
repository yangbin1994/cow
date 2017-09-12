import React from 'react'
import PreviewCard from './PreviewCard'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Card, Col, Table, } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { DataTable } from 'components'
import styles from './index.less'

@connect(
  ({ media_type_id: { PartnerRecord, } }) => ({ ...PartnerRecord, })
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
      <Card className={styles.card_strict} title='合作记录'>
        <DataTable {...fetchDataTableProps} />
      </Card>
    )
  }
}
