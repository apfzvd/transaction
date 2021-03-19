import React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

import './styles/config.module.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
