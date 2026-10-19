import MovieGrid from '../components/MovieGrid';
import { useWatchlist } from '../contexts/WatchlistContext';

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you plan to watch</p>
      {/* passes the watchlist as a prop */}
      </div>
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        <div className="empty-state">
          <p>You watchlist is empty. Add movies from the home page to get started!</p>
        </div>
      )}
    </main>
  );
};

export default Watchlist;