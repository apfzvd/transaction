import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Icon = ({ name, className, ...rest }) => {
  return (
    <i data-testid="icon" className={cx('material-icons', className)} {...rest}>
      {name}
    </i>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
}

Icon.defaultProps = {
  name: 'person', // https://material.io/tools/icons/?style=baseline
}

export default Icon
