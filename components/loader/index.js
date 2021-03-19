import React from 'react'
import PropTypes from 'prop-types'

import ClipLoader from 'react-spinners/ClipLoader'

const Loader = ({ size, theme, className, ...rest }) => {
  const colors = {
    primary: '#6045AF',
    inverted: '#fff',
  }

  return (
    <div data-testid="loader" className={className}>
      <ClipLoader color={colors[theme]} size={size} {...rest} />
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.oneOf(['primary', 'inverted']),
}

Loader.defaultProps = {
  size: 50,
  theme: 'primary',
}

export default Loader
