import { useState, useContext } from 'react'
import { Modal } from 'antd'
import { ThemeContext } from '../../context/ThemeContext' // Contexto para modo oscuro/claro
import styles from './style/PokemonCard.module.css'

// 🎨 Colores para cada tipo de Pokémon
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

// 🃏 Componente individual de Pokémon
const PokemonCard = ({ name, id, sprites, types, height, weight, abilities, moves }) => {
  const [isModalOpen, setIsModalOpen] = useState(false) // Control del modal
  const { theme } = useContext(ThemeContext) // Tema actual

  // Abrir modal
  const showModal = () => setIsModalOpen(true)
  // Cerrar modal
  const handleClose = () => setIsModalOpen(false)

  // Seleccionamos los 4 primeros ataques del array `moves`
  const commonMoves = moves.slice(0, 4).map((m) => m.move.name)

  return (
    <>
      {/* =================== TARJETA =================== */}
      <div
        className={`${styles.card} ${theme === 'dark' ? styles.dark : styles.light}`}
        onClick={showModal}
        style={{ cursor: 'pointer' }}
      >
        {/* Encabezado: ID y nombre */}
        <div className={styles.header}>
          <span className={styles.id}>
            #{id.toString().padStart(3, '0')}
          </span>
          <h3 className={styles.name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h3>
        </div>

        {/* Imagen principal */}
        <img
          src={sprites.front_default}
          alt={name}
          className={styles.image}
        />

        {/* Tipos */}
        <div className={styles.types}>
          {types.map((typeInfo) => {
            const typeName = typeInfo.type.name
            return (
              <span
                key={typeInfo.slot}
                className={styles.type}
                style={{ backgroundColor: typeColors[typeName] || '#777' }}
              >
                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
              </span>
            )
          })}
        </div>
      </div>

      {/* =================== MODAL DETALLES =================== */}
      <Modal
        title={
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
            {name.charAt(0).toUpperCase() + name.slice(1)} 
            <span style={{ color: '#999', marginLeft: '0.5rem' }}>
              #{id.toString().padStart(3, '0')}
            </span>
          </span>
        }
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        bodyStyle={{
          backgroundColor: theme === 'dark' ? '#1f1f1f' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        {/* Imagen grande */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={sprites.other?.['official-artwork']?.front_default || sprites.front_default}
            alt={name}
            style={{ width: '180px', height: '180px' }}
          />
        </div>

        {/* Información física */}
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Altura:</strong> {height / 10} m</p>
          <p><strong>Peso:</strong> {weight / 10} kg</p>
        </div>

        {/* Tipos */}
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Tipo:</strong></p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {types.map((typeInfo) => {
              const typeName = typeInfo.type.name
              return (
                <span
                  key={typeInfo.slot}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: typeColors[typeName] || '#777',
                    color: '#fff',
                    fontWeight: 'bold'
                  }}
                >
                  {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                </span>
              )
            })}
          </div>
        </div>

        {/* Habilidades */}
        <div style={{ marginBottom: '15px' }}>
          <p><strong>Habilidades:</strong></p>
          <ul>
            {abilities.map((a) => (
              <li key={a.ability.name}>
                {a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Ataques comunes */}
        <div>
          <p><strong>Ataques más comunes:</strong></p>
          <ul>
            {commonMoves.map((move, idx) => (
              <li key={idx}>
                {move.charAt(0).toUpperCase() + move.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  )
}

export default PokemonCard
