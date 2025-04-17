import styles from '../styles/Crypto.module.css'

export default function CryptoCard({ coin }) {
  return (
    <div className={styles.card}>
      <img src={coin.image} width="50" height="50" alt={coin.name} />
      <h3>{coin.name}</h3>
      <p>${coin.current_price.toLocaleString()}</p>
      <p className={coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  )
}
