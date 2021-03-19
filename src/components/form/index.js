import React, { createContext, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

export const FormContext = createContext()

const Form = ({ className, children, onSubmit, isValid }) => {
  const [data, setData] = useState({})
  const [error, setError] = useState({})
  const [showErrors, setShowErrors] = useState(false)

  const setFormData = (newData) => setData((data) => ({ ...data, ...newData }))
  const setFormError = (newError) =>
    setError((error) => ({ ...error, ...newError }))

  const hasError = useCallback(
    () =>
      Object.values(error).reduce(
        (acc, errorArr) => acc || Boolean(errorArr.length),
        false
      ),
    [error]
  )

  useEffect(() => {
    if (isValid && Object.keys(data).length) {
      const formErrors = hasError()
      isValid(!formErrors)
    }
  }, [data, hasError, isValid])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setShowErrors(true)
    onSubmit({ data, error, isValid: !hasError() })
  }

  return (
    <FormContext.Provider
      value={{
        data,
        error,
        showErrors,
        setFormData,
        setFormError,
        setShowErrors,
      }}
    >
      <form data-testid="form" className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

Form.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func,
  isValid: PropTypes.func,
  className: PropTypes.string,
}

export default Form
