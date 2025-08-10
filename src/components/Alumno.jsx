function Alumno({ legajo, nombre, condicion, mail, highlight }) {
  return (
    <li
      // Aplicamos un estilo inline simple para resaltar la búsqueda
      style={{
        backgroundColor: highlight ? 'rgba(255, 255, 0, 0.3)' : 'transparent', // resaltado sutil amarillo
        padding: '4px 8px',
        borderRadius: '4px',
        marginBottom: '4px',
      }}
    >
      Legajo: {legajo}. Nombre: {nombre}.{' '}
      {condicion === 'Inscripto' && `Mail: ${mail}`}
    </li>
  )
}

export default Alumno
