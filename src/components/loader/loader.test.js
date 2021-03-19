import React from 'react'
import { render, screen } from '@testing-library/react'
import Loader from './'

describe('[Component] Loader', () => {
  it('Renders correctly', () => {
    render(<Loader />)
    const element = screen.getByTestId('loader')
    expect(element).toBeInTheDocument()
  })
})
