// pages/Contact/index.jsx

// Importamos useContext para consumir contexto y useParams para leer parámetros de URL
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

// Importamos el contexto para el tema (claro/oscuro)
import { ThemeContext } from '../../context/ThemeContext'

// Importamos los estilos encapsulados con CSS Modules
import styles from './Contact.module.css'

function Contact() {
  // Obtenemos el parámetro 'type' de la URL (ejemplo: /contact/support)
  const { type } = useParams()

  // Consumimos el contexto para saber si el tema es 'dark' o 'light'
  const { theme } = useContext(ThemeContext)

  return (
    // Aplicamos clases CSS combinando la clase base y el tema activo
    <main className={`${styles.contact} ${theme === 'dark' ? styles.dark : styles.light}`}>
      
      {/* Título principal de la página */}
      <h1>Contact Page</h1>

      {/* Mostrar subtítulo si 'type' existe, si no, mostrar mensaje indicativo */}
      {type ? (
        <h2>Type: {type}</h2>
      ) : (
        <p>Please select a contact type from the menu.</p>
      )}
    </main>
  )
}

export default Contact
// Exportamos el componente Contact para que pueda ser utilizado en otras partes de la aplicación
// Este componente muestra una página de contacto con un tema claro u oscuro basado en el contexto  y un tipo de contacto opcional basado en la URL.
// Además, utiliza CSS Modules para estilos encapsulados y evitar conflictos de nombres.  