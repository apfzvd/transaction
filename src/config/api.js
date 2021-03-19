import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://5fffcb39cb21e10017af807a.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
})
