import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api";
import { MovieType } from "../../util/interface";
import MovieCard from "../movie/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan as greaterThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../movie/movie.css";

const TrendingMovies = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const navigate = useNavigate();

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
      <div className="trendingMoviesHeadingContainer">
        <div className="trending-movie-lable">All Trending Movies</div>
        <FontAwesomeIcon
          icon={greaterThan}
          className="fontIcon-greater"
          onClick={() => navigate("/allTredingMovies")}
        />
      </div>
      <div className="tredningmovies-container scrollbar-hide">
        {movies.map((movie: MovieType) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
