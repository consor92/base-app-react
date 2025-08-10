import { useContext } from 'react'

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Page/Home'
import Students from './Page/Students'
import Layout from './Page/Layout'
import NotFound from './Page/NotFound'
import SWCharacters from './Page/SWCharacters'
import CharacterDetail from './Page/CharacterDetail'
import Contact from './Page/Contact'
import About from './Page/About'

import { ThemeContext } from './context/ThemeContext.jsx'  // importamos el contexto


function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: 10, right: 10 }}>
      Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  )
}



function App() {
  return (
    <div className="App">
      {/* BrowserRouter habilita la navegación tipo SPA (Single Page Application)
          usando el historial del navegador sin recargar la página */}
      <BrowserRouter>

        {/* Botón visible en toda la app */}
        <ThemeToggleButton />

        {/* Routes es el contenedor que agrupa TODAS las rutas de la aplicación */}
        <Routes>

          {/* Ruta padre: no tiene un path definido, pero envuelve a otras rutas
              y renderiza el componente <Layout /> que probablemente tiene <Outlet />
              para mostrar el contenido de las rutas hijas */}
          <Route element={<Layout />}>

            {/* Ruta estática "/" → Página principal */}
            <Route path="/" element={<Home />} />

            {/* EJEMPLO 1: Props directos a un componente.
                Pasamos defaultYear y defaultSection como props iniciales para que Students
                los use si no recibe parámetros de la URL */}
            <Route
              path="students"
              element={<Students defaultYear={2025} defaultSection="A" />}
            />

            {/* Ruta padre "/sw-characters" que agrupa subrutas */}
            <Route path="sw-characters">

              {/* index → Ruta por defecto cuando NO se especifica subruta.
                  Esto significa que si entramos a "/sw-characters" sin nada más,
                  se mostrará el componente SWCharacters (ej: listado de personajes) */}
              <Route index element={<SWCharacters />} />

              {/* Ruta dinámica con parámetro :id
                  Ejemplo: "/sw-characters/3" mostrará CharacterDetail para el id=3 */}
              <Route path=":id" element={<CharacterDetail />} />
            </Route>

            {/* Ruta dinámica con parámetro :type
                Ejemplo: "/contact/soporte" o "/contact/ventas"
                → El componente Contact puede usar useParams() para saber qué tipo es */}
            <Route path="contact/:type" element={<Contact />} />

            {/* Ruta estática "/about" */}
            <Route path="about" element={<About />} />

            {/* Ruta comodín "*" captura cualquier URL que no coincida con las anteriores
                y muestra la página de "Not Found" (error 404) */}
            <Route path="*" element={<NotFound />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App
