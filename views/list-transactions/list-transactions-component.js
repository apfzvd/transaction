import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import cx from 'classnames'

import { navigateTo } from '../../helpers/navigation'
import { currency } from '../../helpers/masks'

import { fetchTransactionList } from './list-transactions-store'

import Header from '../../components/header'
import Button from '../../components/button'
import Loader from '../../components/loader'

import styles from './list-transactions.module.scss'

const statusMap = {
  paid: 'Paga',
  refused: 'Recusada',
}

const ListTransactions = () => {
  const dispatch = useDispatch()
  const { list: transactionList, loading, loaded } = useSelector(
    ({ transactions }) => transactions
  )

  useEffect(() => {
    !transactionList.length && dispatch(fetchTransactionList())
  }, [dispatch, transactionList.length])

  const getTotalTransactions = () => transactionList.length
  const getAmoutTransactions = () => {
    const total = transactionList.reduce(
      (total, value) => total + (value.amount || 0),
      0
    )
    return currency(total) || 0
  }

  const renderTransaction = ({
    credit_card_holder_name,
    date,
    status,
    amount,
    id,
  }) => (
    <div key={id} data-testid="transaction-item" className={styles.transaction}>
      <div className={styles.transactionContent}>
        <div className={styles.name}>
          {`${credit_card_holder_name}`.toLowerCase()}
        </div>
        <div className={styles.status}>{statusMap[status] || 'Pendente'}</div>
        <div className={styles.date}>
          {format(new Date(date), 'dd/MM/yyyy HH:mm')}
        </div>
        <div className={styles.amount}>{currency(amount)}</div>
      </div>
    </div>
  )

  const goToCreation = () => {
    navigateTo('/create-transaction')
  }

  const renderTransactionList = () => {
    if (loaded && !transactionList.length) {
      return (
        <div data-testid="error" className={cx(styles.error, 'flow')}>
          <p>Ops, parece que algo deu errado :(</p>
          <p>Tente novamente em instantes!</p>
        </div>
      )
    }

    return transactionList.map(renderTransaction)
  }

  return (
    <div className={styles.listTransactions}>
      <Header contentClassName="flow">
        <div className={styles.total}>
          <h2 className={styles.totalTitle}>Número de transações</h2>
          <div className={styles.totalValue}>
            {loading ? <Loader size={20} /> : getTotalTransactions()}
          </div>
        </div>

        <div className={styles.total}>
          <h2 className={styles.totalTitle}>Valor total</h2>
          <div className={styles.totalValue}>
            {loading ? <Loader size={20} /> : getAmoutTransactions()}
          </div>
        </div>
      </Header>

      <section className={styles.list}>
        {loading ? (
          <div data-testid="loading-list" className={styles.loaderWrap}>
            <Loader />
          </div>
        ) : (
          renderTransactionList()
        )}
      </section>

      <div className={styles.buttonWrapper}>
        <Button
          data-testid="create-transaction"
          iconLeft="add_circle"
          modifier="full"
          onClick={goToCreation}
        >
          Criar transação
        </Button>
      </div>
    </div>
  )
}

export default ListTransactions
