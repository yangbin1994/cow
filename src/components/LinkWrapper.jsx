import { Link } from 'react-router-dom'

export const LinkWrapper = (props) => {
  const Component = props.to ? Link : 'a'
  return (
    <Component {...props}>
      {props.children}
    </Component>
  )
}
