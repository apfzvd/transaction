import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Icon from '../icon'

import styles from './notification.module.scss'

const Notification = ({ type, children, show, className }) => {
  const iconType = {
    danger: 'error_outline',
    success: 'check_circle_outline',
    info: 'help_outline',
  }

  if (show) {
    return (
      <div className={cx(className, styles.wrapper, { [styles[type]]: type })}>
        <Icon className={styles.icon} name={iconType[type]} />
        <div className={styles.message}>{children}</div>
      </div>
    )
  }

  return null
}

Notification.propTypes = {
  type: PropTypes.oneOf(['danger', 'success', 'info']),
  show: PropTypes.bool,
  className: PropTypes.string,
}

Notification.defaultProps = {
  show: false,
  type: 'info',
}

export default Notification
