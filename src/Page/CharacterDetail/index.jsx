// pages/CharacterDetail/index.jsx

import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'
import swService from '../../services/swapi'
import { ThemeContext } from '../../context/ThemeContext'
import styles from './CharacterDetail.module.css'

function CharacterDetail() {
  // Obtenemos el "id" del personaje desde la URL (React Router)
  const { id } = useParams()

  // Consumimos el contexto del tema para saber si estamos en 'dark' o 'light'
  const { theme } = useContext(ThemeContext)

  // Estado para controlar si estamos cargando los datos
  const [isLoading, setIsLoading] = useState(false)
  // Estado para guardar la información del personaje
  const [characterInfo, setCharacterInfo] = useState(null)
  // Estado para almacenar posibles errores de carga
  const [error, setError] = useState(null)

  // useEffect para traer datos cada vez que cambia el id
  useEffect(() => {
    // Función asíncrona para obtener datos
    const fetchData = async () => {
      setIsLoading(true)   // Indicamos que comienza la carga
      setError(null)       // Limpiamos errores previos
      try {
        // Llamada al servicio para obtener datos del personaje
        const response = await swService.getPersonById(id)
        setCharacterInfo(response) // Guardamos la info recibida
      } catch (err) {
        // Si ocurre un error, guardamos mensaje para mostrar
        setError('Error al cargar la información del personaje')
      } finally {
        setIsLoading(false) // Terminó la carga, sea éxito o error
      }
    }

    fetchData()
  }, [id]) // Se ejecuta cada vez que cambia el parámetro id

  return (
    // Aplicamos clases CSS Modules según tema (dark o light)
    <main className={`${styles.characterDetail} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h1>Información del personaje</h1>

      {/* Si está cargando mostramos spinner */}
      {isLoading && (
        <Spin tip="Cargando info del personaje..." size="large">
          <div className="content" />
        </Spin>
      )}

      {/* Si hay error mostramos mensaje en rojo */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Si no está cargando, no hay error y tenemos datos mostramos info */}
      {!isLoading && !error && characterInfo && (
        <div>
          <h2>{characterInfo.name}</h2>
          <p>Género: {characterInfo.gender}</p>
          <p>Altura: {characterInfo.height} cm</p>
          <p>Año de nacimiento: {characterInfo.birth_year}</p>
          {/* Podés agregar más campos según te interese */}
        </div>
      )}
    </main>
  )
}

export default CharacterDetail
