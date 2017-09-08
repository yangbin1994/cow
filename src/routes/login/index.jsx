import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import { Iconfont } from 'components'
import styles from './index.less'

const FormItem = Form.Item

@connect(
  ({ login }) => ({ login })
)
@Form.create()
export default class Login extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func,
  }

  render = () => {
    const {
      login: { loginLoading, },
      dispatch,
      form: {
        getFieldDecorator,
        validateFieldsAndScroll,
      },
    } = this.props

    function handleOk() {
      validateFieldsAndScroll((errors, values) => {
        if (errors) {
          return
        }
        dispatch({
          type: 'login/login',
          payload: values,
        })
      })
    }

    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {
              getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: '用户名必须填写',
                  },
                ],
              })(
                <Input
                  size="large"
                  onPressEnter={handleOk}
                  placeholder="用户名" />
                )
            }
          </FormItem>
          <FormItem hasFeedback>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '密码必须填写',
                  },
                ],
              }
              )(
                <Input
                  size="large"
                  type="password"
                  onPressEnter={handleOk}
                  placeholder="密码" />
                )
            }
          </FormItem>
          <div className={styles['verification-code']}>
            <FormItem
              hasFeedback
              className={styles['verification-code__input']}>
              {
                getFieldDecorator('verificationCode', {
                  rules: [
                    {
                      required: true,
                      message: '验证码不能为空',
                    },
                    {
                      len: 6,
                      message: '验证码长度为6位',
                    }
                  ],
                }
                )(
                  <Input
                    size="large"
                    onPressEnter={handleOk}
                    placeholder="验证码" />
                  )
              }
            </FormItem>
            <div className={styles['verification-code__img']}>
              <img src={'http://www.acfun.cn/verification/captcha?d=1504677652570'} alt="" />
            </div>
            <div className={styles['verification-code__btn-switch']}>
              <Iconfont spin onClick={() => alert(1)} type={'refresh'} />
            </div>
          </div>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={loginLoading}>
              登 录
          </Button>
          </Row>
        </form>
      </div>
    )
  }
}
