import { useEffect, useState } from "react";
import { MovieType } from "../../util/interface";
import { fetchTrendingMovies } from "../../api";
import MovieCard from "../movie/MovieCard";
import Header from "../header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan as lesserThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../movie/movie.css";

const AllTrendingMovies = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchAllTrendingMovies = async () => {
      try {
        const moviesData = await fetchTrendingMovies();
        console.log(moviesData);

        setMovies(moviesData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllTrendingMovies();
  }, []);

  return (
    <>
      <Header />
      <div className="allArendingMoviesHeadingContainer">
        <FontAwesomeIcon
          icon={lesserThan}
          className="fontIcon-lessThan"
          onClick={() => navigate("/")}
        />
        <div className="trending-movie-lable">All Trending Movies</div>
      </div>
      <div className="allTredingMovies-container">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default AllTrendingMovies;
