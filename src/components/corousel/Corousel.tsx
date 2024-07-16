import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../../api";
import { MovieType } from "../../util/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan as greaterThan } from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";

const Carousel = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="trendingMoviesHeadingContainer">
        <div className="trending-movie-lable">All Popular Movies</div>
        <FontAwesomeIcon
          icon={greaterThan}
          className="fontIcon-greater"
          onClick={() => navigate("/allPopularMovies")}
        />
      </div>
      <div className="carousel">
        <button className="carousel-button prev" onClick={handlePrev}>
          ‹
        </button>
        {movies.length > 0 && (
          <div
            className="carousel-slide"
            onClick={() => navigate(`/movie/${movies[currentIndex].id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].backdrop_path}`}
              alt={movies[currentIndex].title}
            />
            <div className="carousel-caption">
              <h3>{movies[currentIndex].title}</h3>
              <p>{movies[currentIndex].overview}</p>
            </div>
          </div>
        )}
        <button className="carousel-button next" onClick={handleNext}>
          ›
        </button>
      </div>
    </>
  );
};

export default Carousel;
