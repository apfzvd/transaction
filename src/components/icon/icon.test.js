import React from 'react'
import { render, screen } from '@testing-library/react'
import Icon from './'

describe('[Component] Icon', () => {
  it('Renders correctly', () => {
    render(<Icon name="closes" />)
    const element = screen.getByTestId('icon')
    expect(element).toBeInTheDocument()
  })
})
