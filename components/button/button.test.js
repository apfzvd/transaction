import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './'

describe('[Component] Button', () => {
  it('Renders Test Button with correct children', () => {
    render(<Button>Test Button</Button>)
    const element = screen.getByText('Test Button')
    expect(element).toHaveTextContent('Test Button')
  })

  it('When has disable prop, button should be disabled', () => {
    render(<Button disabled>Test Button</Button>)
    const element = screen.getByText('Test Button')
    expect(element).toBeDisabled()
  })

  it('When has the loading prop, should show loader', () => {
    render(<Button loading>Test Button</Button>)
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('When has the iconLeft prop, should show icon', () => {
    render(<Button iconLeft="closes">Test Button</Button>)
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
  })

  it('Should call function when click', () => {
    const clickFn = jest.fn()
    render(<Button onClick={clickFn}>Test Button</Button>)
    userEvent.click(screen.getByText('Test Button'))
    expect(clickFn).toHaveBeenCalled()
  })

  it('Should not be able to click if loading is true', () => {
    const clickFn = jest.fn()
    render(
      <Button onClick={clickFn} loading>
        Test Button Disabled
      </Button>
    )
    userEvent.click(screen.getByText('Test Button Disabled'))
    expect(clickFn).not.toHaveBeenCalled()
  })
})
