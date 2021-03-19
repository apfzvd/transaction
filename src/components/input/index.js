import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import Icon from '../icon'

import { FormContext } from '../form'

import styles from './input.module.scss'

const Input = ({ validation, onChange, name, label, format, ...rest }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState([])
  const {
    setFormData,
    setFormError,
    setShowErrors,
    error,
    showErrors,
  } = useContext(FormContext)

  const validateData = (value) =>
    validation.reduce((acc, validationFunc) => {
      const error = validationFunc(value)

      if (error !== null && error !== undefined) {
        acc.push(error)
      }
      return acc
    }, [])

  const setValuesOnContext = (value = null, errors = validateData(value)) => {
    setFormData({ [name]: value })
    setFormError({ [name]: errors })
  }

  useEffect(() => {
    setValuesOnContext()
  }, [])

  const handleChange = (evt) => {
    const { value } = evt.target
    const formatted = format ? format(value) : value
    const errors = validateData(formatted)
    setInputValue(formatted)
    setShowErrors(false)
    setInputError([])

    if (onChange) {
      onChange(formatted, errors, evt)
    } else {
      setValuesOnContext(formatted, errors)
    }
  }

  const handleBlur = (evt) => {
    const { value } = evt.target
    const errors = validateData(value)
    setInputError(errors)
  }

  const getErrors = () => {
    if (showErrors) {
      return error[name][0]
    }

    return inputError[0]
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={cx(styles.input, {
          [styles.active]: inputValue,
          [styles.withError]: getErrors(),
        })}
        onChange={handleChange}
        name={name}
        value={inputValue}
        data-testid={name}
        {...rest}
        type="text"
        id={name}
        onBlur={handleBlur}
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {getErrors() ? (
        <span data-testid="input-error" className={styles.error}>
          <Icon name="info" />
          <span className={styles.errorMessage}>{getErrors()}</span>
        </span>
      ) : null}
    </div>
  )
}

Input.propTypes = {
  validation: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.func,
}

Input.defaultProps = {
  validation: [],
}

export default Input
