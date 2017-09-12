import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Button, Row, Form, Input, DatePicker,
  Card, Select, Icon, Radio, Spin, Menu,
  Dropdown,
} from 'antd'
import { formSync } from 'utils'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Search.less'

const FormItem = Form.Item
const AntdSearch = Input.Search
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const MenuItem = Menu.Item

@connect(
  ({
    media_search: { locationState, kols, kolVal, },
    loading: {
      effects: {
        'media_search/fetchKols': loading,
      }
    }
   }) => ({ locationState, loading, kols, kolVal, })
)
@formSync({
  namespace: 'media_search',
  propName: 'locationState',
  handleName: 'mergeLocationState',
})
export default class Search extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    locationState: PropTypes.object,
  }

  state = {
    expand: false,
  }

  fetchKols = _.debounce(() => {
    this.props.dispatch({
      type: 'media_search/fetchKols',
    })
  }, 200)

  render = () => {
    const {
      dispatch,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
    } = this.props

    return (
      <Form layout='inline'>
        <Row type='flex' justify='space-between'>
          <FormItem label='榜单时间'>
            {
              getFieldDecorator('username')(<DatePicker />)
            }
          </FormItem>
          <Dropdown
            placement="bottomLeft"
            trigger={['hover']}
            overlay={(
              <Menu className={styles['search__menu']} onClick={() => console.error('123')}>
                {
                  this.props.loading ? (
                    <MenuItem><Spin size="small" /></MenuItem>
                  ) : this.props.kols.map(({ name }, key) => (
                    <MenuItem key={key}>
                      {name} <Icon type="right" />
                    </MenuItem>
                  ))
                }
              </Menu>
            )}
          >
            <Input
              className={styles['search__input']}
              size='large'
              value={this.props.kolVal}
              onChange={e => {
                dispatch({
                  type: 'media_search/updateSearch',
                  payload: e.target.value,
                })
                this.fetchKols()
              }}
              placeholder='请输入KOL名称或ID'
            />
          </Dropdown>
        </Row>
        <div className={styles['filter']}>
          <Row type='flex' justify='space-between' className=''>
            <FormItem label='平台'>
              {
                getFieldDecorator('pt')(
                  <Select
                    mode="multiple"
                    size='large'
                    className={styles['filter__input-select']}
                  >
                    <Option value='1'>微博</Option>
                    <Option value='2'>微信</Option>
                    <Option value='3'>今日头条</Option>
                  </Select>
                )
              }
            </FormItem>
          </Row>
          <Row
            type='flex'
            justify='space-between'
            className={classNames(styles.filter__row, {
              [styles['filter__row_hide']]: !this.state.expand
            })}
          >
            <FormItem label='资质'>
              {
                getFieldDecorator('zz')(
                  <Select
                    mode="multiple"
                    size='large'
                    className={styles['filter__input-select']}
                  >
                    <Option value='1'>未认证</Option>
                    <Option value='2'>已认证</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='行业'>
              {
                getFieldDecorator('username')(
                  <Select
                    mode="multiple"
                    size='large'
                    className={styles['filter__input-select']}
                  >
                    <Option value='1'>123</Option>
                    <Option value='2'>123</Option>
                    <Option value='3'>123</Option>
                  </Select>
                )
              }
            </FormItem>
          </Row>
          <Row
            type='flex'
            justify='space-between'
            className={classNames(styles.filter__row, {
              [styles['filter__row_hide']]: !this.state.expand
            })}
          >
            <FormItem label='品牌'>
              {
                getFieldDecorator('username')(
                  <Select
                    mode="multiple"
                    size='large'
                    className={styles['filter__input-select']}
                  >
                    <Option value='1'>123</Option>
                    <Option value='2'>123</Option>
                    <Option value='3'>123</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='其他'>
              {
                getFieldDecorator('username')(
                  <Select
                    mode="multiple"
                    size='large'
                    className={styles['filter__input-select']}
                  >
                    <Option value='1'>123</Option>
                    <Option value='2'>123</Option>
                    <Option value='3'>123</Option>
                  </Select>
                )
              }
            </FormItem>
          </Row>
          <Row type='flex' justify='space-between' className={classNames({
            [styles['filter__row_hide']]: !this.state.expand
          })}>
            <FormItem label='排序方式'>
              {
                getFieldDecorator('px')(
                  <RadioGroup>
                    <RadioButton value="1">按数值排序</RadioButton>
                    <RadioButton value="2">按相关度排序</RadioButton>
                  </RadioGroup>
                )
              }
            </FormItem>
          </Row>
          <a
            className={styles['filter__collapse-btn']}
            onClick={() => this.setState({ expand: !this.state.expand, })}
          >
            <Icon type={this.state.expand ? 'up' : 'down'} />
          </a>
        </div>
      </Form>
    )
  }

}
