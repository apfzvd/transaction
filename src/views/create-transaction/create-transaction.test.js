import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateTransaction from './create-transaction-component'

import { renderWithRedux } from '../../helpers/testing'

import transactions from '../../services/transactions'
import { navigateTo } from '../../helpers/navigation'

jest.mock('../../services/transactions', () => ({
  createTransaction: jest.fn(),
}))

jest.mock('../../helpers/navigation', () => ({
  navigateTo: jest.fn(),
}))

describe('CreateTransaction', () => {
  it('Renders correctly with all fields', () => {
    renderWithRedux(<CreateTransaction />)
    expect(screen.getByText('Nova Transação')).toBeInTheDocument()
    expect(screen.getByTestId('form')).toBeInTheDocument()

    const fields = [
      'credit_card_holder_name',
      'buyer_document',
      'credit_card_number',
      'credit_card_expiration_date',
      'credit_card_cvv',
      'amount',
    ]

    fields.forEach((field) => {
      expect(screen.getByTestId(field)).toBeInTheDocument()
    })
  })

  it('Submit should be disabled', () => {
    renderWithRedux(<CreateTransaction />)
    expect(screen.getByText('Criar transação')).toBeDisabled()
  })

  it('Name is required and should not have numbers', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('credit_card_holder_name')
    fireEvent.blur(input, { target: { value: 'a' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, 'Teste123')
    expect(input.value).toBe('Teste')
    fireEvent.blur(input, { target: { value: 'Teste' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('CPF is required and should be valid', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('buyer_document')
    fireEvent.blur(input, { target: { value: '123456789100' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, '38727225143')
    expect(input.value).toBe('387.272.251-43')
    fireEvent.blur(input, { target: { value: '387.272.251-43' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('Card is required and should be valid', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('credit_card_number')
    fireEvent.blur(input, { target: { value: '124' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, '1234123412341234')
    expect(input.value).toBe('1234 1234 1234 1234')
    fireEvent.blur(input, { target: { value: '1234 1234 1234 1234' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('Expiration is required and should be valid', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('credit_card_expiration_date')
    fireEvent.blur(input, { target: { value: '13/21' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, '1221')
    expect(input.value).toBe('12/21')
    fireEvent.blur(input, { target: { value: '12/21' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('CVV is required and should be valid', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('credit_card_cvv')
    fireEvent.blur(input, { target: { value: '1' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, '123')
    expect(input.value).toBe('123')
    fireEvent.blur(input, { target: { value: '123' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('Amount is required and should be valid', () => {
    renderWithRedux(<CreateTransaction />)
    const input = screen.getByTestId('amount')
    fireEvent.blur(input, { target: { value: '' } })
    expect(screen.getAllByTestId('input-error').length).toBe(1)

    userEvent.type(input, '42000')
    expect(input.value).toBe('R$ 420,00')
    fireEvent.blur(input, { target: { value: 'R$ 420,00' } })
    expect(screen.queryAllByTestId('input-error').length).toBe(0)
  })

  it('Submit should NOT be disabled and fails', async () => {
    transactions.createTransaction.mockRejectedValueOnce()
    renderWithRedux(<CreateTransaction />)
    const button = screen.getByText('Criar transação')
    userEvent.type(screen.getByTestId('credit_card_holder_name'), 'Teste')
    userEvent.type(screen.getByTestId('buyer_document'), '894.638.187-66')
    userEvent.type(
      screen.getByTestId('credit_card_number'),
      '1234 1234 1234 1234'
    )
    userEvent.type(screen.getByTestId('credit_card_expiration_date'), '12/21')
    userEvent.type(screen.getByTestId('credit_card_cvv'), '123')
    userEvent.type(screen.getByTestId('amount'), '15000')

    expect(button).not.toBeDisabled()

    userEvent.click(button)
    expect(transactions.createTransaction).toHaveBeenCalledWith({
      transaction: {
        credit_card_holder_name: 'Teste',
        amount: 15000,
        buyer_document: '89463818766',
        credit_card_number: '1234123412341234',
        credit_card_cvv: '123',
        credit_card_expiration_date: '1221',
      },
    })

    const error = await waitFor(() =>
      screen.getByText(
        'Ops, parece que algo deu errado :( Tente novamente em instantes!'
      )
    )
    expect(error).toBeInTheDocument()
  })

  it('Submit should NOT be disabled and succedes', async () => {
    transactions.createTransaction.mockResolvedValueOnce({ data: {} })
    renderWithRedux(<CreateTransaction />)
    const button = screen.getByText('Criar transação')
    userEvent.type(screen.getByTestId('credit_card_holder_name'), 'Teste')
    userEvent.type(screen.getByTestId('buyer_document'), '894.638.187-66')
    userEvent.type(
      screen.getByTestId('credit_card_number'),
      '1234 1234 1234 1234'
    )
    userEvent.type(screen.getByTestId('credit_card_expiration_date'), '12/21')
    userEvent.type(screen.getByTestId('credit_card_cvv'), '123')
    userEvent.type(screen.getByTestId('amount'), '15000')

    expect(button).not.toBeDisabled()

    userEvent.click(button)

    const error = await waitFor(() =>
      screen.queryByText(
        'Ops, parece que algo deu errado :( Tente novamente em instantes!'
      )
    )
    expect(error).not.toBeInTheDocument()
    expect(navigateTo).toHaveBeenCalledWith('/')
  })
})
