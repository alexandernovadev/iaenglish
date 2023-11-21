import axios from 'axios'

const nextAPI = axios.create({
  baseURL: '/api',

  headers: {
    // 'Content-Security-Policy': "default-src 'self'; script-src 'none'; object-src 'none';",
    // 'X-Content-Type-Options': 'nosniff',
    // 'X-Frame-Options': 'DENY'
  }
})

export default nextAPI
