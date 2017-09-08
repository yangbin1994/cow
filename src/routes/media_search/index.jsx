import React from 'react'
import Search from './Search'
import Table from './Table'
import styles from './index.less'

export default class MediaSearch extends React.Component {
  render = () => {
    return (
      <div className='content-inner'>
        <Search />
        <Table className={styles.table} />
      </div>
    )
  }
}
