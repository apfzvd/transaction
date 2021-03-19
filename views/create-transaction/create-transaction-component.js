import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'

import { navigateTo, goBack } from '../../helpers/navigation'

import {
  required,
  requiredLen,
  validExpiration,
  validarCPF,
} from '../../helpers/validation'

import {
  cpf,
  currency,
  cvv,
  expiration,
  card,
  nonDigits,
} from '../../helpers/masks'

import {
  fetchTransactionList,
  createTransaction,
} from '../list-transactions/list-transactions-store'

import Header from '../../components/header'
import Form from '../../components/form'
import Input from '../../components/input'
import Button from '../../components/button'
import Icon from '../../components/icon'
import Notification from '../../components/notification'

import styles from './create-transaction.module.scss'

const CreateTransaction = () => {
  const [formIsValid, setFormValid] = useState(false)
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()
  const { list: transactionList, loadingCreation } = useSelector(
    ({ transactions }) => transactions
  )

  useEffect(() => {
    !transactionList.length && dispatch(fetchTransactionList())
  }, [dispatch, transactionList.length])

  const cleanData = (data) => ({
    ...data,
    amount: parseInt(data.amount.replace(/\D/g, '')),
    buyer_document: data.buyer_document.replace(/\D/g, ''),
    credit_card_number: data.credit_card_number.replace(/\D/g, ''),
    credit_card_expiration_date: data.credit_card_expiration_date.replace(
      /\D/g,
      ''
    ),
  })

  const submitTransaction = async ({ data }) => {
    const res = await dispatch(
      createTransaction({ transaction: cleanData(data) })
    )
    if (!res.error) {
      navigateTo('/')
    } else {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    }
  }

  return (
    <div className={styles.createTransaction}>
      <Header contentClassName={styles.header}>
        <Icon
          onClick={goBack}
          className={styles.back}
          name="keyboard_backspace"
        />
        <h1 className={styles.title}>Nova Transação</h1>
      </Header>

      <Form
        className={styles.form}
        onSubmit={submitTransaction}
        isValid={setFormValid}
      >
        <div className={cx(styles.formWrap, 'flow')}>
          <Input
            validation={[requiredLen(2, { digitsOnly: false })]}
            format={nonDigits}
            name="credit_card_holder_name"
            label="Nome da pessoa compradora"
          />
          <Input
            validation={[requiredLen(11), validarCPF]}
            format={cpf}
            name="buyer_document"
            label="CPF"
          />
          <Input
            validation={[requiredLen(16)]}
            format={card}
            name="credit_card_number"
            label="N° do cartão"
          />
          <div className={styles.rowCard}>
            <Input
              validation={[requiredLen(4), validExpiration]}
              format={expiration}
              name="credit_card_expiration_date"
              label="Data de expiração"
            />
            <Input
              validation={[requiredLen(3)]}
              format={cvv}
              name="credit_card_cvv"
              label="CVV"
            />
          </div>
          <Input
            validation={[required]}
            format={currency}
            name="amount"
            label="Valor da transação"
          />
        </div>

        <Button
          type="submit"
          modifier="full"
          loading={loadingCreation}
          disabled={!formIsValid}
        >
          Criar transação
        </Button>
      </Form>

      <Notification show={showError} type="danger">
        Ops, parece que algo deu errado :( Tente novamente em instantes!
      </Notification>
    </div>
  )
}

export default CreateTransaction
