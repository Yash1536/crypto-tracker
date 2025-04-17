import { useEffect, useState } from 'react'
import CryptoCard from './CryptoCard'
import styles from '../styles/Crypto.module.css'

export default function CryptoList() {
  const [cryptos, setCryptos] = useState([])

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => res.json())
      .then(data => setCryptos(data.slice(0, 50))) // Shows top 50
  }, [])

  return (
    <div className={styles.grid}>
      {cryptos.map(coin => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}
