import React from 'react'  
// 1. Importamos React, necesario para interpretar JSX y crear componentes.

import ReactDOM from 'react-dom/client'  
// 2. Importamos ReactDOM para manejar el DOM y "montar" la app en el navegador.
//    En React 18 se usa 'react-dom/client' y el método createRoot.

import App from './App.jsx'  
// 3. Importamos nuestro componente principal App desde el archivo App.jsx.
//    Aquí empieza toda la aplicación React.

import './index.css'  
// 4. Importamos el archivo CSS global para los estilos básicos de la app.

import { ThemeProvider } from './context/ThemeContext.jsx'



// 5. Buscamos el elemento HTML con id 'root' (en index.html está el div raíz donde React monta la app).
//    Creamos una raíz React con createRoot para controlar esa sección del DOM.
// Importamos un contexto para manejar tema (por ejemplo)
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    {/* Envolvemos App con el ThemeProvider para que todos los componentes puedan
        acceder al tema actual y cambiarlo */}
    <ThemeProvider>  
      <App />
    </ThemeProvider>
  </React.StrictMode>

  
)
