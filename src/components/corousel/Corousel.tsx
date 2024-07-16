import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../../api";
import { MovieType } from "../../util/interface";

const Carousel = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const moviesData = await fetchPopularMovies();
        setMovies(moviesData.results);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularMovies();
  }, []);

  return (
    <div className="carousel">
      {movies.map((movie: MovieType) => (
        <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
