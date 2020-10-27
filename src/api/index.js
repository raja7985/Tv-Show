import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Interceptor for responses
const responseInterceptor = response => {
  switch (response.status) {
    case 200:
      break
  }

  return response
}

// Interceptor for error responses
const errorInterceptor = error => {
  let path = '/error'

  if (error.response && error.response.status === 404) {
    path = '/404'
  }

  router.push(path)
}

api.interceptors.response.use(responseInterceptor, errorInterceptor)

export default api
