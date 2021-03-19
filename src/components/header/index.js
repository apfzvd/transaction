import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import styles from './header.module.scss'

const Header = ({ children, className, contentClassName }) => {
  return (
    <header className={cx(styles.header, className)}>
      <div className={cx(styles.wrapper, contentClassName)}>{children}</div>
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
}

export default Header
