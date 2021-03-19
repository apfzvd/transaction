import React from 'react'
import { Router, Switch, Redirect, Route } from 'react-router-dom'

import history from './history'

import ListTransactions from './views/list-transactions'
import CreateTransaction from './views/create-transaction'

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ListTransactions} />
        <Route exact path="/create-transaction" component={CreateTransaction} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}
