import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { searchMovies } from './services/movieService'; 
import { useState } from 'react';
import Watchlist from './pages/Watchlist';
import { WatchlistProvider } from './contexts/WatchlistContext';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => { // Handler function to query search
    const results = await searchMovies(query); 
    setSearchResults(results); 
  }; 

  // the entire App gets wrapped by the Watchlist Provider so I can access context
  return (
    <WatchlistProvider>
      <Router>
        <div className="app">
          <Header onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  );
};

export default App;