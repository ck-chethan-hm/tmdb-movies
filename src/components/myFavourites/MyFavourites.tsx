import { useSelector, useDispatch } from "react-redux";
import { MovieType } from "../../util/interface";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";

const MyFavourites = () => {
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

  return (
    <div className="movies-grid">
      {favorites.map((movie) => (
        <div key={movie.id} className="movie-item">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average}</p>
          <button onClick={() => handleToggleFavorite(movie)}>
            {isFavorite(movie.id) ? (
              <span style={{ color: "red" }}>★</span> // Filled star
            ) : (
              <span>☆</span> // Empty star
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyFavourites;
