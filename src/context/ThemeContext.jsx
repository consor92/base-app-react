import { createContext, useState, useEffect } from "react";

// Crear contexto
export const ThemeContext = createContext();

// Proveedor de contexto con lógica para alternar tema
export function ThemeProvider({ children }) {
  // Estado para el tema, por defecto 'light'
  const [theme, setTheme] = useState("light");

  // Cambiar tema entre 'light' y 'dark'
  function toggleTheme() {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  // Aplicar clase CSS al <body> para cambiar estilos globales
  useEffect(() => {
    document.body.className = theme; // Asume que .light y .dark están definidos en CSS
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
