import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000') + '/api',
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const state = JSON.parse(localStorage.getItem('electrostore') || '{}')
  const token = state?.auth?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
