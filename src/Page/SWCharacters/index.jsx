import  { useEffect, useState } from 'react'
import { Pagination, Spin, Alert } from 'antd'
import PokemonCard from '../../components/Pokemon/PokemonCard'
import styles from './PokemonList.module.css'

const PAGE_SIZE = 16 // 4 x 4 grid

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      setError(null)
      try {
        const offset = (page - 1) * PAGE_SIZE
        // Primero obtengo la lista básica
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`)
        const data = await res.json()
        setTotalCount(data.count)

        // Luego obtengo detalles para cada pokemon (para imagen, tipos, etc)
        const detailedPromises = data.results.map(async (p) => {
          const detailRes = await fetch(p.url)
          return detailRes.json()
        })
        const detailedData = await Promise.all(detailedPromises)

        setPokemons(detailedData)
      } catch (e) {
        setError('Error cargando pokemones')
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [page])

  return (
    <main className={styles.container}>
      <h1>Pokémon List</h1>

      {loading && <Spin tip="Cargando..." size="large" />}
      {error && <Alert message={error} type="error" />}
      
      <div className={styles.grid}>
        {!loading && !error && pokemons.map((p) => (
          <PokemonCard key={p.id} {...p} />
        ))}
      </div>

      <Pagination
        current={page}
        pageSize={PAGE_SIZE}
        total={totalCount}
        onChange={setPage}
        style={{ marginTop: 20, textAlign: 'center' }}
      />
    </main>
  )
}

export default PokemonList
