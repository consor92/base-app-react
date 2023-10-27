import { useEffect, useState } from 'react'
import userService from '../../services/users'

function Home() {
  const [apiInfo, setApiInfo] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const response = await userService.getRoot()
      setApiInfo(response)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>Hola clase de Programación III</h1>
      {apiInfo && (
        <h3>
          Esta App esta comunicandose con {apiInfo.name} a el ambiente{' '}
          {apiInfo.enviroment} de version {apiInfo.version}{' '}
        </h3>
      )}
    </>
  )
}

export default Home
