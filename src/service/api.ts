import axios from 'axios'

const api = axios.create({
  baseURL: process.env.AUTH0_DOMAIN,
})

export default api
