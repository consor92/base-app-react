import axios from 'axios'
import { useEffect } from 'react'
// import swService from '../../services/swapi'

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://swapi.dev/api/people')
      console.log(response)
    }
    fetchData()
  }, [])

  return <h1>Hola clase de Programación III</h1>
}

export default Home
