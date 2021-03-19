import { http } from '../config/api'

const transactions = {
  getTransactions() {
    return http.get('/transactions')
  },
  getOneTransactions({ id }) {
    return http.get(`/transactions/${id}`)
  },
  createTransaction(payload = {}) {
    return http.post(`/transactions`, payload)
  },
}

export default transactions
