import { useState, useEffect, useContext } from 'react'
// Importamos el listado estático de alumnos
import listadoAlumnos from '../../data/alumnos.json'
// Componente para renderizar cada alumno
import Alumno from '../../components/Alumno'
// Componentes UI de Ant Design
import { Button, Input } from 'antd'
// Contexto para manejar tema claro/oscuro
import { ThemeContext } from '../../context/ThemeContext'
// Importamos estilos con CSS Modules
import styles from './Students.module.css'


/** * Componente Students
 * Muestra un listado de alumnos con opciones de búsqueda y filtrado
 */
function Students() {
  // Estado para activar/desactivar filtro por legajo > 150000
  const [isFiltered, setIsFiltered] = useState(false)
  // Estado con el listado actual de alumnos a mostrar
  const [alumnos, setAlumnos] = useState([])
  // Estado para el texto del input de búsqueda
  const [searchTerm, setSearchTerm] = useState('')


  // Obtenemos el tema actual (claro/oscuro) del contexto
  const { theme } = useContext(ThemeContext)


  // Efecto para cargar los alumnos al montar el componente
  // Simulamos una llamada a una API con un retraso de 3 segundos  leido de un archivo JSON
  // Esto es útil para evitar que se muestre el listado vacío al inicio
  // y para simular una carga de datos realista
  // para simular una carga de datos
  // y evitar que se muestre el listado vacío al inicio
  useEffect(() => {
    // Simulamos llamada API con retraso de 3 segundos
    // Usamos setTimeout para simular la carga de datos
    // Esto es útil para evitar que se muestre el listado vacío al inicio
    // y para simular una carga de datos realista
    const timer = setTimeout(() => {
      setAlumnos(listadoAlumnos) // Cargamos todos los alumnos
    }, 3000)
    // Limpiamos el timeout si el componente se desmonta antes
    return () => clearTimeout(timer)
  }, [])

  // Función para activar o desactivar filtro legajo > 150000 
  // Si no está filtrado, mostramos solo los alumnos con legajo mayor a 150000
  // Si ya está filtrado, mostramos todos los alumnos
  // Actualizamos el estado isFiltered para reflejar el cambio
  const onFilterClick = () => {
    if (!isFiltered) {
      // Aplicamos filtro
      setAlumnos(listadoAlumnos.filter((a) => a.legajo > 150000))
    } else {
      // Quitamos filtro, mostramos todos
      setAlumnos(listadoAlumnos)
    }
    setIsFiltered((prev) => !prev)
  }


  // Filtramos el listado de alumnos según el texto ingresado en el input de búsqueda
  // Si el input está vacío, mostramos todos los alumnos
  // Si hay texto, filtramos por nombre o legajo
  // Usamos toLowerCase() para hacer la búsqueda insensible a mayúsculas/minúsculas
  // y toString() para asegurar que el legajo se pueda comparar como texto
  // Filtramos alumnos según texto en búsqueda en nombre o legajo
  // Usamos includes() para verificar si el texto está presente
  // en el nombre o legajo del alumno
  // Esto permite buscar por nombre o por número de legajo

  const filteredAlumnos = alumnos.filter((a) => {
    // Buscamos nombre ignorando mayúsculas
    const nameMatch = a.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    // Buscamos legajo (convertido a string) que incluya texto búsqueda
    const legajoMatch = a.legajo.toString().includes(searchTerm)
    return nameMatch || legajoMatch
  })


  // Renderizamos el componente
  // Aplicamos clases CSS según el tema actual
  // y mostramos el listado de alumnos o mensaje de carga
  return (
    // Aplicamos clases CSS para tema claro u oscuro
    <main className={`${styles.students} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <h1>Listado de alumnos de la clase</h1>

      {/* Si no hay alumnos cargados mostramos mensaje de carga */}
      {alumnos.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className={styles.actions}>
            {/* Input para ingresar búsqueda */}
            <Input
              placeholder="Buscar alumno por nombre o legajo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: 10, width: 300 }}
              allowClear // icono para limpiar el input rápido
            />
            {/* Botón para activar o desactivar filtro de legajo */}
            <Button type="primary" onClick={onFilterClick}>
              {isFiltered ? 'Quitar filtro' : 'Filtrar'} legajo mayor 150.000
            </Button>
          </div>

          {/* Listado de alumnos filtrados */}
          <ul className={styles.list}>
            {filteredAlumnos.length > 0 ? (
              filteredAlumnos.map((a) => (
                <Alumno
                  key={a.legajo}
                  {...a}
                  // Pasamos la prop highlight para activar el resaltado
                  highlight={
                    searchTerm &&
                    (a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      a.legajo.toString().includes(searchTerm))
                  }
                />
              ))
            ) : (
              <p>No se encontraron alumnos que coincidan con la búsqueda.</p>
            )}
          </ul>


          {/* Cantidad total de alumnos mostrados */}
          <p>Cantidad total de alumnos: {filteredAlumnos.length}</p>
        </>
      )}
    </main>
  )
}

export default Students
