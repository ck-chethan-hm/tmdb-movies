import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenreType, MovieType } from "../../util/interface";
import { fetchMoviesByGenere } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";

const GenrePage = () => {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const genereSelected: GenreType = useSelector(
    (state: any) => state.generes.selectedGenere
  );
  const [movies, setMovies] = useState<MovieType[]>([]);
  const isFavorite = (movieId: number) => {
    return movies.some((movie: MovieType) => movie.id === movieId);
  };

  const handleToggleFavorite = (movie: MovieType) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  useEffect(() => {
    const getMoviesByGenere = async () => {
      try {
        const moviesData = await fetchMoviesByGenere(genre);
        console.log(moviesData);

        setMovies(moviesData.results);
      } catch (error) {
        console.error(error);
      }
    };
    getMoviesByGenere();
  }, []);

  return (
    <>
      {genereSelected ? <h2>{`${genereSelected.name} Movies`}</h2> : null}
      <div className="movies-grid">
        {movies.map((movie) => (
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
    </>
  );
};

export default GenrePage;
