
import styles from './PokemonCard.module.css'

// Componente para mostrar un Pokémon individual
// Recibe props como name, id, sprites (imagen), types (tipos)

const PokemonCard = ({ name, id, sprites, types }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>#{id.toString().padStart(3, '0')}</span>
        <h3 className={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      </div>
      <img
        src={sprites.front_default}
        alt={name}
        className={styles.image}
      />
      <div className={styles.types}>
        {types.map((typeInfo) => (
          <span key={typeInfo.slot} className={styles.type}>
            {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
