import api from './api'

// Objeto que agrupa funciones para llamar a endpoints relacionados con usuarios
const userService = {}

// Petición GET a la raíz de la API o endpoint base para usuarios
userService.getRoot = () => api.get('/')

// Ejemplo para obtener un usuario por ID
userService.getUserById = (id) => api.get(`/users/${id}`)

// Ejemplo para crear un usuario (POST)
userService.createUser = (userData) => api.post('/users', userData)

// Ejemplo para actualizar un usuario (PUT o PATCH)
userService.updateUser = (id, userData) => api.put(`/users/${id}`, userData)

// Ejemplo para eliminar un usuario (DELETE)
userService.deleteUser = (id) => api.delete(`/users/${id}`)

export default userService
