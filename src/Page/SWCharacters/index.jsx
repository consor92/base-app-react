import { useEffect, useState } from 'react'
import { Pagination, Spin, Alert } from 'antd'
import PokemonCard from '../../components/Pokemon/PokemonCard'
import styles from './PokemonList.module.css'

// Cantidad inicial de Pokémon por página
const DEFAULT_PAGE_SIZE = 16 

const PokemonList = () => {
  // Estado con la lista de pokemones cargados (incluye datos detallados)
  const [pokemons, setPokemons] = useState([])

  // Estado para controlar si estamos cargando
  const [loading, setLoading] = useState(false)

  // Estado para manejar errores
  const [error, setError] = useState(null)

  // Página actual
  const [page, setPage] = useState(1)

  // Cantidad de elementos por página (dinámico)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  // Total de pokemones disponibles en la API
  const [totalCount, setTotalCount] = useState(0)

  // Efecto que se ejecuta cada vez que cambia la página o el tamaño de página
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true) // Mostrar spinner
      setError(null)   // Limpiar error anterior

      try {
        // Calcular desde qué posición empezar a traer los Pokémon
        const offset = (page - 1) * pageSize

        // 1️⃣ Traer lista básica de Pokémon (nombre y URL para detalles)
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
        )
        const data = await res.json()
        setTotalCount(data.count) // Guardar total para paginación

        // 2️⃣ Obtener detalles de cada Pokémon (imagen, tipo, número, etc.)
        const detailedPromises = data.results.map(async (p) => {
          const detailRes = await fetch(p.url)
          return detailRes.json()
        })

        // Esperar que todas las peticiones terminen
        const detailedData = await Promise.all(detailedPromises)

        // Guardar en estado la lista detallada
        setPokemons(detailedData)

      } catch (e) {
        // Si algo falla, mostrar mensaje de error
        setError('Error cargando pokemones')
      } finally {
        // Ocultar spinner
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [page, pageSize]) // Se ejecuta cuando cambian página o cantidad por página

  return (
    <main className={styles.container}>
      <h1>Pokémon List</h1>

      {/* Spinner de carga */}
      {loading && <Spin tip="Cargando..." size="large" />}

      {/* Mensaje de error */}
      {error && <Alert message={error} type="error" />}

      {/* Grid de Pokémon */}
      <div className={styles.grid}>
        {!loading && !error && pokemons.map((p) => (
          <PokemonCard key={p.id} {...p} />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        current={page}            // Página actual
        pageSize={pageSize}       // Elementos por página
        total={totalCount}        // Total de elementos (de la API)
        onChange={(newPage) => setPage(newPage)} // Cambiar página
        showSizeChanger           // Mostrar selector de cantidad por página
        pageSizeOptions={['4', '8', '16', '32']} // Opciones disponibles
        onShowSizeChange={(newPage, newSize) => {
          setPage(newPage)        // Actualizar página
          setPageSize(newSize)    // Actualizar cantidad por página
        }}
        style={{ marginTop: 20, textAlign: 'center' }} // Estilo
      />
    </main>
  )
}

export default PokemonList
