import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api";
import { MovieType } from "../../util/interface";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";

const TrendingMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const dispatch = useDispatch();
  const favorites: MovieType[] =
    useSelector((state: any) => state.favorites.myFavorites) || [];

  const isFavorite = (movieId: number) => {
    return favorites.some((movie: MovieType) => movie.id === movieId);
  };

  const handleToggleFavorite = (movie: MovieType) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const moviesData = await fetchTrendingMovies();
        setMovies(moviesData.results);
      } catch (error) {
        console.error(error);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <div>
      <h2>All Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
            <button
              className="favorite-icon"
              onClick={() => handleToggleFavorite(movie)}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
