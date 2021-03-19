import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../icon'
import Loader from '../loader'

import cx from 'classnames'
import styles from './button.module.scss'

const Button = ({
  children,
  className,
  iconLeft,
  modifier,
  loading,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={cx(styles.button, className, {
        [styles[modifier]]: modifier,
        [styles.isLoading]: loading,
      })}
      disabled={disabled || loading}
      {...rest}
    >
      {iconLeft && <Icon className={styles.iconLeft} name={iconLeft} />}
      {children}
      {loading && (
        <Loader className={styles.loader} size={15} theme="inverted" />
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconLeft: PropTypes.string,
  modifier: PropTypes.oneOf(['full']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Button
