import axios from 'axios'
//import localStorage from './localStorage' // Asegúrate de importar tu wrapper de localStorage 



// Crear instancia de axios con configuración base para la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // URL base de la API desde variables de entorno
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,  // Tiempo de espera de 15 segundos
  headers: {
    'Cache-Control': 'no-cache', // Evitar caché en las peticiones
    'Pragma': 'no-cache', // Evitar caché en las peticiones
    'Expires': '0', // Evitar caché en las peticiones
    'Content-Language': 'es', // Indicar el idioma de la petición
    'Accept-Language': 'es', // Indicar el idioma aceptado en la respuesta
    Accept: 'application/json', // Indicamos que aceptamos JSON como respuesta
    'Content-Type': 'application/json', // Indicamos que enviamos JSON
  },
})

// Interceptor para modificar la configuración antes de enviar cada petición
api.interceptors.request.use(
  (config) => {
    // Obtener datos del localStorage (ej. token de autenticación)
    // Verificamos si hay datos en localStorage
    // y si existe un token para agregarlo al header de autorización
    const data = localStorage.get()
    if (data && data.token) {
      // Agregar token de autorización en el header si existe
      config.headers.Authorization = `Bearer ${data.token}`
    }
    return config // Retornamos la configuración modificada
  }, 
  (error) => {
    // Manejo de error al preparar la petición
    console.error('Request Error:', error)
    // Rechazamos la promesa para que el error pueda ser capturado en el catch del llamado
    return Promise.reject(error)
  }
)




// Interceptor para procesar la respuesta de la API
api.interceptors.response.use(
  (response) => {
    // Retornamos solo los datos de la respuesta (response.data)
    // Esto permite que el consumidor de la API no tenga que acceder a response.data.data
    if (response.data && response.data.error) {
      // Si la respuesta contiene un error, lo manejamos aquí
      console.error('API Error Response:', response.data.error)
      // Podrías lanzar un error o manejarlo de otra manera
      return Promise.reject(new Error(response.data.error))
    }
    return response.data
  },
  (error) => {
    // Aquí podrías manejar errores globales, mostrar alertas, etc.
    // Por ejemplo, si el error es de red o de servidor
    if (!error.response) {
      console.error('Network Error:', error.message)
      return Promise.reject(new Error('Network Error: ' + error.message))
    }
    // Si hay un error en la respuesta, lo manejamos aquí
    if (error.response.status === 401) {
      // Manejo específico para errores 401 (no autorizado)
      console.error('Unauthorized Error:', error.response.data)
      // Podrías redirigir al usuario a la página de login o mostrar un mensaje
      return Promise.reject(new Error('Unauthorized: ' + error.response.data.message))
    }
    console.error('API Error:', error)
    // Rechazamos la promesa para que el error pueda ser capturado en el catch del llamado
    return Promise.reject(error)
  }
)

export default api
