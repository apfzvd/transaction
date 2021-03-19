import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './'
describe('[Component] Form', () => {
  it('Renders Test Form with correct children', () => {
    render(<Form>Test Form</Form>)
    const element = screen.getByText('Test Form')
    expect(element).toBeInTheDocument()
  })

  it('Calls onSubmit when submits the form', () => {
    const onSubmit = jest.fn()
    render(
      <Form onSubmit={onSubmit}>
        Test Form <button type="submit">Enviar</button>
      </Form>
    )
    userEvent.click(screen.getByText('Enviar'))
    expect(onSubmit).toHaveBeenCalledWith({
      data: {},
      error: {},
      isValid: true,
    })
  })
})
