import { useState, useEffect } from 'react'
import listadoAlumnos from '../../data/alumnos.json'
import Alumno from '../../components/Alumno'
import { Button } from 'antd'

function Students() {
  const [isFiltered, setIsFiltered] = useState(false)
  const [alumnos, setAlumnos] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Ejecutado despues de 5 segundos')
      setAlumnos(listadoAlumnos)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const onFilterClick = () => {
    if (!isFiltered) {
      setAlumnos(listadoAlumnos.filter((a) => a.legajo > 150000))
    } else {
      setAlumnos(listadoAlumnos)
    }
    setIsFiltered((isFiltered) => !isFiltered)
  }

  // TODO: agregar un input  para  buscar un alumno y marcarlo en la lista

  return (
    <>
      <h1>Listado de alumnos de la clase</h1>
      {alumnos.length == 0 ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div>
            <Button type="primary" onClick={() => onFilterClick()}>
              {isFiltered ? 'Quitar filtro' : 'Filtrar'} legajo mayor 150.000
            </Button>
          </div>
          <ul>
            {alumnos.map((a) => (
              <Alumno key={a.legajo} {...a} />
            ))}
          </ul>
          <p>Cantidad total de alumnos: {alumnos.length}</p>
        </>
      )}
    </>
  )
}

export default Students
