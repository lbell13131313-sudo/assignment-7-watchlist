import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => { // invokes my service function
      try {
        setLoading(true);
        setError(null);
        const movieData = await getPopularMovies();
        setMovies(movieData); // setMovies now is set to movieData
      } catch (err) { // error message so if the popular movies don't load it sets movies to empty
        setError('Failed to load popular movies. Please try again later.');
        setMovies([]); // Set to empty array to prevent map errors
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(); // immediately call fetchMovies so the movies array has data
  }, []);

  const displayMovies = searchResults || movies; // if searchResults doesn't have a value then it will display the popular movies instead

  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;