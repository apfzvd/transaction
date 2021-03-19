import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '../form'
import Input from './'

import { requiredLen } from '../../helpers/validation'
import { nonDigits } from '../../helpers/masks'

describe('[Component] Input', () => {
  it('Renders with correct label', () => {
    render(
      <Form>
        <Input name="test" label="Input Teste" />
      </Form>
    )
    const element = screen.getByLabelText('Input Teste')
    expect(element).toBeInTheDocument()
  })

  it('On typing should call onChange', () => {
    const onChange = jest.fn()
    render(
      <Form>
        <Input name="test" label="Input Teste" onChange={onChange} />
      </Form>
    )
    userEvent.type(screen.getByLabelText('Input Teste'), 'M')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('When modified, should show data on Form submit', () => {
    const onSubmit = jest.fn()
    render(
      <Form onSubmit={onSubmit}>
        <Input name="test" label="Input Teste" />
        <button type="submit">Enviar</button>
      </Form>
    )
    userEvent.type(screen.getByLabelText('Input Teste'), 'My Value')
    userEvent.click(screen.getByText('Enviar'))
    expect(onSubmit).toHaveBeenCalledWith({
      data: {
        test: 'My Value',
      },
      error: {
        test: [],
      },
      isValid: true,
    })
  })

  it('With validation, should show error on page', () => {
    const onSubmit = jest.fn()
    render(
      <Form onSubmit={onSubmit}>
        <Input name="test" validation={[requiredLen(2)]} label="Input Teste" />
        <button type="submit">Enviar</button>
      </Form>
    )
    userEvent.type(screen.getByLabelText('Input Teste'), '1')
    userEvent.click(screen.getByText('Enviar'))

    expect(screen.getByTestId('input-error')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Esse campo precisa ter, pelo menos, 2 caracteres/números'
      )
    ).toBeInTheDocument()
  })

  it('With validation and format props, should show error and formatted value on Form Submit', () => {
    const onSubmit = jest.fn()
    render(
      <Form onSubmit={onSubmit}>
        <Input
          name="test"
          validation={[requiredLen(2)]}
          format={nonDigits}
          label="Input Teste"
        />
        <button type="submit">Enviar</button>
      </Form>
    )
    userEvent.type(screen.getByLabelText('Input Teste'), '1')
    userEvent.click(screen.getByText('Enviar'))

    expect(
      screen.getByText(
        'Esse campo precisa ter, pelo menos, 2 caracteres/números'
      )
    ).toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledWith({
      data: {
        test: '',
      },
      error: {
        test: ['Esse campo precisa ter, pelo menos, 2 caracteres/números'],
      },
      isValid: false,
    })
  })
})
