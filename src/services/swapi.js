import axios from 'axios'

// Crear instancia de axios con configuración base para la API pública de Star Wars
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // URL base de la API pública de Star Wars
  timeout: 1000 * 15, // Timeout de 15 segundos
})

// Interceptor para peticiones - acá podrías agregar headers o logs si querés
api.interceptors.request.use(
  (config) => {
    // Por ejemplo, loguear la petición
    // console.log('Enviando petición a:', config.url)
    // Si necesitas agregar headers, lo podrías hacer aquí
    // config.headers['Custom-Header'] = 'value'
    return config
  },
  // Manejo de error al preparar la petición
  (error) => Promise.reject(error) // Manejo de error al preparar la petición
)

// Interceptor para respuestas - aquí devolvemos solo los datos directamente
api.interceptors.response.use(
  (response) => response.data, // Extraemos solo el data para simplificar el uso  
  // Manejo de error en la respuesta
  (error) => {
    // Aquí podrías manejar errores globales, mostrar alertas, etc.
    console.error('Error en la respuesta API:', error)
    // Si el error es de red o de servidor, podrías manejarlo aquí
    if (!error.response) {
      console.error('Error de red:', error.message)
    }
    return Promise.reject(error) // Rechazamos para manejarlo en el catch
  }
)



// Objeto que agrupa funciones para llamar a endpoints de la API de Star Wars
// Definimos los servicios/endpoints para consumir la API
const pokeService = {
  getRoot: () => api.get('/'), // info general
  getPokemonList: () => api.get('/pokemon'), // lista de Pokémon
  getPokemonById: (id) => api.get(`/pokemon/${id}`), // Pokémon por id o nombre
}


export default pokeService
