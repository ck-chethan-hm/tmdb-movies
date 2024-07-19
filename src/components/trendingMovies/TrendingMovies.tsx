import { fetchTrendingMovies } from "../../api";
import { MovieType } from "../../util/interface";
import MovieCard from "../movie/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan as greaterThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../movie/movie.css";
import useFetchMovies from "../../customHooks/useFetchMovies";

const TrendingMovies = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetchMovies({
    apiToCall: fetchTrendingMovies,
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <div className="trendingMoviesHeadingContainer">
        <div className="trending-movie-lable">All Trending Movies</div>
        <FontAwesomeIcon
          icon={greaterThan}
          className="fontIcon-greater"
          onClick={() => navigate("/allTredingMovies")}
        />
      </div>
      <div className="tredningmovies-container scrollbar-hide">
        {data.results.map((movie: MovieType) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default TrendingMovies;
