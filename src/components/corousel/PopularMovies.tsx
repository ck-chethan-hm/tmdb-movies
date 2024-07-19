import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPopularMovies } from "../../api";
import { MovieType } from "../../util/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan as lesserThan } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan as greaterThan } from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";
import useFetchMovies from "../../customHooks/useFetchMovies";

const PopularMovies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const { data, loading, error } = useFetchMovies({
    apiToCall: fetchPopularMovies,
  });

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.results.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.results.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

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
          {data.results.map((movie: MovieType) => (
            <React.Fragment key={movie.id}>
              <img
                key={movie.id}
                src={
                  data.results[currentIndex] &&
                  `https://image.tmdb.org/t/p/w500${data.results[currentIndex].backdrop_path}`
                }
                alt=""
                className="popularMovieCarousel-image"
                onClick={() =>
                  navigate(`/movie/${data.results[currentIndex].id}`)
                }
                style={{ translate: `${-100 * currentIndex}%` }}
              />
              <div
                className="popularMovieCarousel-caption"
                onClick={() =>
                  navigate(`/movie/${data.results[currentIndex].id}`)
                }
              >
                <h3 style={{ color: "white" }}>
                  {data.results[currentIndex].title}
                </h3>
                <p style={{ color: "white" }}>
                  {data.results[currentIndex].overview}
                </p>
              </div>
            </React.Fragment>
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
