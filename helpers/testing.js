import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import store from '../store'

export const renderWithRedux = (component) =>
  render(<Provider store={store}>{component}</Provider>)
