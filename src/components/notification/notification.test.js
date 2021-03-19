import React from 'react'
import { render, screen } from '@testing-library/react'
import Notification from './'

describe('[Component] Notification', () => {
  it('Renders correctly', () => {
    render(<Notification show>Notification Test</Notification>)
    const element = screen.getByText('Notification Test')
    expect(element).toBeInTheDocument()
  })

  it('Without show, should not render', () => {
    render(<Notification>Notification Test</Notification>)
    const element = screen.queryByText('Notification Test')
    expect(element).not.toBeInTheDocument()
  })
})
