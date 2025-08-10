// pages/About/index.jsx


import React from 'react'
// Si usas React Router, importá Link para navegación SPA:
import { Link } from 'react-router-dom'

import styles from './About.module.css'


// Componente funcional que representa la página About
function About() {
  return (
    // Uso de <main> para semántica y accesibilidad
    // La clase 'about-page' puede usarse para estilos específicos
    <main className={styles.aboutPage}>
      {/* Título principal de la página */}
      <h1>About Us</h1>

      {/* Párrafo con información descriptiva */}
      <p>
        Esta es la página de About donde explicamos la misión y visión de la aplicación.
      </p>

      {/* 
        Ejemplo de navegación con Link de React Router, recomendable en SPA 
        para evitar recarga completa de la página.
      */}
      {/* <Link to="/">Volver al inicio</Link> */}

      {/* Si no usás React Router, un link tradicional también funciona */}
      <a href="/">Volver al inicio</a>
    </main>
  )
}

export default About
