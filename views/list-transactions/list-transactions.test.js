import React from 'react'
import { waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ListTransactions from './'
import { renderWithRedux } from '../../helpers/testing'

import transactions from '../../services/transactions'
import { navigateTo } from '../../helpers/navigation'

const mockTransactions = [
  {
    amount: 10000,
    buyer_document: '12345678912',
    credit_card_cvv: '123',
    credit_card_expiration_date: '0121',
    credit_card_holder_name: 'Nome teste',
    credit_card_number: '4111111111111111',
    date: '2020-11-10T19:43:56.451Z',
    id: 1,
    status: 'paid',
  },
  {
    amount: 10000,
    buyer_document: '12345678912',
    credit_card_cvv: '123',
    credit_card_expiration_date: '0121',
    credit_card_holder_name: 'Nome teste',
    credit_card_number: '4111111111111111',
    date: '2020-11-10T19:43:56.451Z',
    id: 2,
    status: 'refused',
  },
]

jest.mock('../../services/transactions', () => ({
  getTransactions: jest.fn(),
}))

jest.mock('../../helpers/navigation', () => ({
  navigateTo: jest.fn(),
}))

describe('When getTransactions is pending or rejected', () => {
  it('getTransactions is pending', () => {
    renderWithRedux(<ListTransactions />)
    expect(screen.queryByTestId('loading-list')).toBeInTheDocument()
  })

  it('getTransactions is rejected', async () => {
    transactions.getTransactions.mockRejectedValueOnce()

    renderWithRedux(<ListTransactions />)
    const error = await waitFor(() => screen.getByTestId('error'))
    expect(error).toBeInTheDocument()
  })
})

describe('Renders ListTransactions', () => {
  it('getTransactions is fulfilled', async () => {
    transactions.getTransactions.mockResolvedValueOnce({
      data: mockTransactions,
    })
    renderWithRedux(<ListTransactions />)
    const list = await waitFor(() => screen.getAllByTestId('transaction-item'))
    expect(list.length).toBe(2)
  })

  it('Status text should appear correctly', async () => {
    renderWithRedux(<ListTransactions />)
    expect(screen.getByText('Paga')).toBeInTheDocument()
    expect(screen.getByText('Recusada')).toBeInTheDocument()
  })

  it('Should navigate to create', () => {
    renderWithRedux(<ListTransactions />)
    userEvent.click(screen.getByTestId('create-transaction'))
    expect(navigateTo).toHaveBeenCalledWith('/create-transaction')
  })
})
