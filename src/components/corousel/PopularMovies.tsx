import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../../api";
import { MovieType } from "../../util/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan as lesserThan } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan as greaterThan } from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";

const PopularMovies = () => {
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
      <div className="popularMoviesHeadingContainer">
        <div className="popular-movie-lable">All Popular Movies</div>
        <FontAwesomeIcon
          icon={greaterThan}
          className="fontIcon-greater"
          onClick={() => navigate("/allPopularMovies")}
        />
      </div>
      <div className="popularMovieCarouselContainer">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {movies.map((movie) => (
            <>
              <img
                key={movie.id}
                src={
                  movies[currentIndex] &&
                  `https://image.tmdb.org/t/p/w500${movies[currentIndex].backdrop_path}`
                }
                alt=""
                className="popularMovieCarousel-image"
                onClick={() => navigate(`/movie/${movies[currentIndex].id}`)}
                style={{ translate: `${-100 * currentIndex}%` }}
              />
              <div
                className="popularMovieCarousel-caption"
                onClick={() => navigate(`/movie/${movies[currentIndex].id}`)}
              >
                <h3 style={{ color: "white" }}>{movies[currentIndex].title}</h3>
                <p style={{ color: "white" }}>
                  {movies[currentIndex].overview}
                </p>
              </div>
            </>
          ))}
        </div>

        <button
          className="popularMovieCarousel-sliderBtn"
          onClick={handlePrev}
          style={{ left: 0 }}
        >
          <FontAwesomeIcon icon={lesserThan} />
        </button>
        <button
          className="popularMovieCarousel-sliderBtn"
          onClick={handleNext}
          style={{ right: 0 }}
        >
          <FontAwesomeIcon icon={greaterThan} />
        </button>
      </div>
    </>
  );
};

export default PopularMovies;
