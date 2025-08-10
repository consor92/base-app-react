import { useEffect, useState, useContext } from 'react'
// Importamos componentes de Ant Design para spinner y alertas
import { Spin, Alert } from 'antd'
// Servicio que llama a la API de Star Wars
import swService from '../../services/swapi'
// Componente para mostrar un personaje individual
import Character from '../../components/Character'
// Contexto para saber el tema actual (claro/oscuro)
import { ThemeContext } from '../../context/ThemeContext'
// Importamos estilos CSS Modules con soporte para modo oscuro/claro
import styles from './SWCharacters.module.css'

function SWCharacters() {
  // Estado para controlar si estamos cargando los datos
  const [isLoading, setIsLoading] = useState(false)
  // Estado para guardar la lista de personajes obtenidos
  const [characters, setCharacters] = useState([])
  // Estado para almacenar posibles errores durante la carga
  const [error, setError] = useState(null)
  // Obtenemos el tema actual desde el contexto
  const { theme } = useContext(ThemeContext)

  // useEffect para cargar datos solo una vez al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)   // Iniciamos el spinner de carga
      setError(null)       // Limpiamos cualquier error previo
      try {
        const response = await swService.getPeople()  // Llamada a la API
        console.log(response)                          // Debug: mostramos respuesta en consola
        setCharacters(response.results)                // Guardamos personajes en estado
      } catch (err) {
        // Si ocurre error, lo guardamos para mostrar mensaje
        setError('Error al cargar los personajes. Intente nuevamente.')
        console.error(err) // También lo mostramos en consola para debug
      } finally {
        setIsLoading(false) // Terminamos carga (exito o error)
      }
    }
    fetchData()
  }, [])

  return (
    // Aplicamos clase container y según tema dark o light
    <main className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h1>Listado de personajes de Star Wars</h1>

      {/* Si estamos cargando, mostramos el spinner */}
      <br />
      {isLoading && (
        <Spin tip="Cargando listado..." size="large">
          <div className="content" />
        </Spin>
      )}
      <br />

      {/* Si hubo un error, mostramos alerta */}
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: '1rem' }}
        />
      )}

      {/* Mostramos personajes solo si no hay error y no estamos cargando */}
      {!isLoading && !error && characters.map((x) => (
        <Character key={x.url} {...x} />
      ))}
    </main>
  )
}

export default SWCharacters
