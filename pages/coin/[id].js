import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Coin() {
  const router = useRouter();
  const { id } = router.query; //coin ID from URL query
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((res) => setCoinData(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <h1>{coinData.name}</h1>
      <p>{coinData.description.en}</p>
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>
      <p>Market Cap: ${coinData.market_data.market_cap.usd}</p>
      <p>24h Change: {coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      
    </div>
  );
}

export default Coin;
