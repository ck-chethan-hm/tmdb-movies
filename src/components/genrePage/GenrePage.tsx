import { useLocation, useParams } from "react-router-dom";
import { MovieType } from "../../util/interface";
import { fetchMoviesByGenere } from "../../api";
import MovieCard from "../movie/MovieCard";
import useFetchMovies from "../../customHooks/useFetchMovies";
import "../movie/movie.css";

const GenrePage = () => {
  const { genre } = useParams();
  const { state } = useLocation();
  const { data, loading, error } = useFetchMovies({
    apiToCall: () => fetchMoviesByGenere(genre),
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      {state ? (
        <div className="selectedGenresHeading">{`${state} Movies`}</div>
      ) : null}
      <div className="moviesByGenres-container">
        {data.results.map((movie: MovieType) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default GenrePage;
