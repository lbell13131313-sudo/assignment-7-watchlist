import { createContext, useState, useContext, useEffect } from 'react';

// creates my watchlist context
const WatchlistContext = createContext();

// creates a custom hookl for consuming the context
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};

// creates the provider component for the watchlist
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => { // checks the local storage for the watchlist, if it cannot be found, returns an empty watchlist
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { // whenever watchlist changes, save to local storage
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); 
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some(m => m.id === movie.id)) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};