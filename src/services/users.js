import api from './api'

const userService = {}

userService.getRoot = () => api.get('/')

export default userService
