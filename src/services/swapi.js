import api from './api'

const swService = {}

swService.getRoot = () => api.get('/')
swService.getPeopleById = (id) => api.get(`/people/${id}`)

export default swService
