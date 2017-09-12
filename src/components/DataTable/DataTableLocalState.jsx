import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { request } from 'utils'
import _ from 'lodash'
import qs from 'query-string'
import { routerRedux } from 'dva/router'
import './DataTable.less'

export class DataTableLocalState extends React.Component {

  static propTypes = {
    fetch: PropTypes.object,
    rowKey: PropTypes.string,
    pagination: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object,
    ]),
    columns: PropTypes.array,
    dataSource: PropTypes.array,
  }

  state = {
    loading: false,
    dataSource: [],
    fetchData: {},
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 100
    },
  }

  componentWillUnmount() {
    this.unlisten()
  }

  componentDidMount() {
    this.unlisten = window.app._history.listen(({ pathname, search }) => {
      const query = qs.parse(search)
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageSize: Number(query.pageSize),
          current: Number(query.current),
        },
        fetchData: {
          results: query.pageSize,
          page: query.current,
          sortField: query.field,
          sortOrder: query.order,
          filters: query.filters,
        },
      }, () => {
        this.fetch()
      })
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
    window.app._store.dispatch(routerRedux.replace({
      pathname: location.pathname,
      search: qs.stringify(
        _.extend(qs.parse(location.search), {
          current: pagination.current,
          pageSize: pagination.pageSize,
          sortField: sorter.field,
          sortOrder: sorter.order,
          // 将空对象转化为空数组，不然qs解析不了
          filters: _.isEmpty(filters) && [],
        })
      )
    }))
  }

  fetch = () => {
    const { fetch: { url, data, dataKey } } = this.props
    const { fetchData } = this.state
    this.setState({ loading: true })
    this.promise = request({
      url,
      data: {
        ...data,
        ...fetchData,
      },
    }).then((result) => {
      if (!this.refs.DataTable) {
        return
      }
      const { pagination } = this.state
      pagination.total = result.total || pagination.total
      this.setState({
        loading: false,
        dataSource: dataKey ? result[dataKey] : result.data,
        pagination,
      })
    })
  }

  render() {
    const { fetch, ...tableProps } = this.props
    const { loading, dataSource, pagination } = this.state

    return (
      <Table
        ref="DataTable"
        bordered
        loading={loading}
        onChange={this.handleTableChange}
        {...tableProps}
        pagination={pagination}
        dataSource={dataSource}
      />
    )
  }
}


