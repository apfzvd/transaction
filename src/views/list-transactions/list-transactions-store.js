import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import transactionsService from '../../services/transactions'

export const fetchTransactionList = createAsyncThunk(
  'transactions/fetchTransactionList',
  async () => {
    const response = await transactionsService.getTransactions()
    return response
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction) => {
    const response = await transactionsService.createTransaction(transaction)
    return response
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    loading: false,
    loaded: false,
    loadingCreation: false,
    error: false,
    list: [],
  },
  reducers: {},
  extraReducers: {
    [fetchTransactionList.pending]: (state) => {
      state.loading = true
    },
    [fetchTransactionList.fulfilled]: (state, action) => {
      const { data } = action.payload || { data: [] }
      state.list = data
      state.loading = false
      state.loaded = true
    },
    [fetchTransactionList.rejected]: (state) => {
      state.loading = false
      state.loaded = true
    },

    [createTransaction.pending]: (state) => {
      state.loadingCreation = true
    },
    [createTransaction.fulfilled]: (state, action) => {
      const {
        data: { date, status, transaction },
      } = action.payload
      state.loadingCreation = false
      state.list.push({
        date,
        status,
        ...transaction,
      })
    },
    [createTransaction.rejected]: (state) => {
      state.loadingCreation = false
    },
  },
})

// export const {} = transactionSlice.actions

export default transactionSlice.reducer
