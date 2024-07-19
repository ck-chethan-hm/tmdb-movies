import { useParams } from "react-router-dom";
import { GenreType, MovieType } from "../../util/interface";
import { fetchMoviesByGenere } from "../../api";
import { useSelector } from "react-redux";
import MovieCard from "../movie/MovieCard";
import "../movie/movie.css";
import { RootState } from "../../store/store";
import useFetchMovies from "../../customHooks/useFetchMovies";

const GenrePage = () => {
  const { genre } = useParams();
  const genereSelected: GenreType = useSelector(
    (state: RootState) => state.generes.selectedGenere
  );

  const { data, loading, error } = useFetchMovies({
    apiToCall: () => fetchMoviesByGenere(genre),
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      {genereSelected ? (
        <div className="selectedGenresHeading">{`${genereSelected.name} Movies`}</div>
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
