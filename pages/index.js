import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customBg, setCustomBg] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 250,
          page: page,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(res.data);
        setTotalPages(Math.ceil(res.headers['x-total-count'] / 250));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const handleFavoriteToggle = (coinId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(coinId)
        ? prevFavorites.filter((id) => id !== coinId)
        : [...prevFavorites, coinId]
    );
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setMenuOpen(false);
  };

  const handleSettings = () => {
    setCustomBg((prev) => !prev);
    setMenuOpen(false);
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Crypto Tracker 🚀</h1>
        <p>Loading coins...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        ...styles.container,
        ...(theme === 'dark' ? styles.dark : {}),
        ...(customBg ? styles.customBg : {}),
      }}
    >
      <h1 style={styles.title}>Crypto Tracker 🚀</h1>

      <div style={styles.menuContainer}>
        <button onClick={toggleMenu} style={styles.menuButton}>
          &#x2022;&#x2022;&#x2022;
        </button>

        {menuOpen && (
          <div style={styles.menu}>
            <button onClick={handleThemeToggle} style={styles.menuItem}>
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <button onClick={handleSettings} style={styles.menuItem}>
              Change Background
            </button>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Search for a coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.favorites}>
        <h2>Favorites</h2>
        <ul>
          {favorites.length === 0 ? (
            <li>No favorites yet.</li>
          ) : (
            favorites.map((favoriteId) => {
              const favoriteCoin = coins.find((coin) => coin.id === favoriteId);
              return (
                <li key={favoriteId}>
                  {favoriteCoin?.name}{' '}
                  <button onClick={() => handleFavoriteToggle(favoriteId)} style={styles.favoriteButton}>
                    Remove from favorites
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Coin</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>24h Change</th>
            <th style={styles.th}>Market Cap</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <tr key={coin.id} style={styles.tr}>
                <td style={styles.td}>
                  <Link href={`/coin/${coin.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={coin.image} alt={coin.name} width="30" style={{ marginRight: 10 }} />
                    {coin.name}
                  </Link>
                </td>
                <td style={styles.td}>${coin.current_price.toLocaleString()}</td>
                <td
                  style={{
                    ...styles.td,
                    color: coin.price_change_percentage_24h < 0 ? 'red' : 'green',
                  }}
                >
                  {coin.price_change_percentage_24h !== null
                    ? coin.price_change_percentage_24h.toFixed(2) + '%'
                    : 'N/A'}
                </td>
                <td style={styles.td}>${coin.market_cap.toLocaleString()}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleFavoriteToggle(coin.id)}
                    style={{
                      ...styles.favoriteButton,
                      backgroundColor: favorites.includes(coin.id) ? 'red' : 'green',
                    }}
                  >
                    {favorites.includes(coin.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.td}>
                No coins found matching the search criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: 'auto',
    background: '#f7f7f7',
    color: '#333',
    borderRadius: '10px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#333',
  },
  menuContainer: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 10,
  },
  menuButton: {
    fontSize: '2rem',
    background: 'none',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
    padding: '0',
  },
  menu: {
    position: 'absolute',
    top: '30px',
    left: '0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
    minWidth: '160px',
    padding: '1rem',
  },
  menuItem: {
    backgroundColor: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    fontSize: '1rem',
    color: '#333',
    borderRadius: '5px',
    marginBottom: '0.5rem',
  },
  search: {
    padding: '0.8rem',
    width: '100%',
    marginBottom: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f0f0f0',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
    padding: '0.8rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  td: {
    padding: '0.8rem',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#333',
  },
  tr: {
    transition: 'background 0.3s',
  },
  dark: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
  },
  customBg: {
    backgroundColor: '#d1f7ff',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '1rem',
  },
  favorites: {
    marginBottom: '2rem',
    padding: '1rem',
    background: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  favoriteButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.9rem',
  },
};
