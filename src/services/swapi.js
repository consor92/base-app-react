import api from './api'

const swService = {}

swService.getRoot = () => api.get('/')

export default swService
