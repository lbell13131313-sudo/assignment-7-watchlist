import { useState, useEffect } from 'react';
import { useWatchlist } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isFavorite, setIsFavorite] = useState(false);
  // check if the movie is already in the watchlist 
  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => { // uses localstorage to find the movies that the user has favorited
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    const isMovieFavorite = favorites.some(fav => fav.id === movie.id);
    setIsFavorite(isMovieFavorite);
  }, [movie.id]);

  const toggleFavorite = () => { // uses localstorage to set movies as favorited or no longer favorited
    const favorites = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovie', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovie', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const handleWatchlistClick = () => { // toggles whether an item is in the watchlist or not
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={poster}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
        {/* adds and removes movie from watchlist context */}
        <button className={`watchlist-button ${inWatchlist ? 'added' : ''}`} onClick={handleWatchlistClick}>
          {inWatchlist ? '✖ Remove from Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;