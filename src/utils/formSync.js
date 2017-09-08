import { Form, } from 'antd'
import _ from 'lodash'

/**
 * 返回一个双向绑定的表单容器组件
 * 实现表单的双向绑定
 */
const formSync = ({
  propName,
  namespace,
  handleName,
  onValuesChange,
  mapPropsToFields
}) => {
  propName = propName || 'formData'
  handleName = handleName || 'mergeFormData'

  onValuesChange = onValuesChange || function (props, validateChangedFields) {
    window.app._store.dispatch({
      type: `${namespace}/${handleName}`,
      payload: validateChangedFields,
    })
  }

  mapPropsToFields = mapPropsToFields || function (props) {
    return _.mapValues(props[propName], item => ({
      value: item
    }))
  }

  return Form.create({ mapPropsToFields, onValuesChange })
}

export default formSync
