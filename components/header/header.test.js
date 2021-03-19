import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './'

describe('[Component] Header', () => {
  it('Renders correctly', () => {
    render(<Header>Header Teste</Header>)
    const element = screen.getByText('Header Teste')
    expect(element).toBeInTheDocument()
  })
})
