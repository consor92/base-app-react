import axios from 'axios'

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 1000 * 15, // 15 sec
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error) // Do something with request error
)

api.interceptors.response.use(
  (response) => response.data, // Do something with response data
  (error) =>
    // Do something with response error
    Promise.reject(console.log(error))
)

const swService = {}

swService.getRoot = () => api.get('/')
swService.getPeople = () => api.get(`/people`)
swService.getPersonById = (id) => api.get(`/people/${id}`)

export default swService
