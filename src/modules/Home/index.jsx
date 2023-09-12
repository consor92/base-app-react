import { useEffect } from 'react'
import swService from '../../services/swapi'

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await swService.getPeopleById(1)
      console.log(response)
    }
    fetchData()
  }, [])

  return <h1>Hola clase de Programación III</h1>
}

export default Home
