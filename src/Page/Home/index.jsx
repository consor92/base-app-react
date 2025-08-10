// pages/Home/index.jsx

import { useContext, useEffect, useState } from 'react'
import userService from '../../services/users'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './Home.module.css'

function Home() {
  // Estado para almacenar la info que viene de la API
  const [apiInfo, setApiInfo] = useState(null)
  // Estado para indicar si está cargando la info
  const [isLoading, setIsLoading] = useState(false)
  // Estado para guardar error si ocurre alguno
  const [error, setError] = useState(null)

  // Consumimos el contexto del tema para cambiar estilos
  const { theme } = useContext(ThemeContext)

  // useEffect para pedir la info de la API al cargar el componente
  // Se ejecuta una vez al montar el componente (comportamiento similar a componentDidMount)
  useEffect(() => {
    // Función asíncrona para pedir datos al backend
    // y manejar estados de carga y error
    // Se define dentro del useEffect para poder usar async/await
    const fetchData = async () => {
      setIsLoading(true)   // Empieza la carga
      setError(null)       // Limpiamos errores previos
      try {
        // Esperamos respuesta del servicio
        const response = await userService.getRoot()
        // Guardamos la info en el estado
        setApiInfo(response) // Guardamos la info
      } catch (err) {
        setError('No se pudo cargar la información')
      } finally {
        setIsLoading(false) // Terminó la carga
      }
    }
    fetchData()
  }, [])



  return (
    // Aplicamos clases condicionales para tema oscuro/claro
    <main className={`${styles.home} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h1>Pagina de Home</h1>
      <p>¡Bienvenido a nuestra aplicación!</p>

      {/* Mostrar mensaje de bienvenida */}
      <p>Esta es la página principal donde encontrarás información general.</p>
      <p>Explora las diferentes secciones usando el menú de navegación.</p>
      <p>Para más detalles, visita las páginas de estudiantes o personajes de Star Wars.</p>

      {/* Mostrar info de la API si está disponible */}
      <h2>Información de la API</h2>

      {/* Mostrar spinner mientras carga */}
      {isLoading && <p>Cargando información...</p>}

      {/* Mostrar error si lo hubo */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Mostrar info sólo si no hay error y tenemos datos */}
      {!isLoading && !error && apiInfo && (
        <h3>
          Esta App está comunicándose con {apiInfo.name} en el ambiente{' '}
          {apiInfo.environment} de versión {apiInfo.version}
        </h3>
      )}
    </main>
  )
}

export default Home
// Este componente muestra un mensaje de bienvenida y la información
// de la API, manejando estados de carga y errores.
// Utiliza el contexto del tema para aplicar estilos condicionales. 