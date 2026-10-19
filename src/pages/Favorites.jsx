import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => { // if movies are favorited, they get added to the array
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    setFavoriteMovies(favorites);
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;