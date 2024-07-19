import { MovieType } from "../../util/interface";
import { fetchPopularMovies } from "../../api";
import MovieCard from "../movie/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan as lesserThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../movie/movie.css";
import useFetchMovies from "../../customHooks/useFetchMovies";

const AllPopularMovies = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetchMovies({
    apiToCall: fetchPopularMovies,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <div className="allArendingMoviesHeadingContainer">
        <FontAwesomeIcon
          icon={lesserThan}
          className="fontIcon-lessThan"
          onClick={() => navigate("/")}
        />
        <div className="trending-movie-lable">All Popular Movies</div>
      </div>
      <div className="allTredingMovies-container">
        {data.results.map((movie: MovieType) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default AllPopularMovies;
