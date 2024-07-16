import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchMovieDetail } from "../../api";
import { MovieType } from "../../util/interface";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetchMovieDetail(movieId);
        console.log(response);

        setMovie(response);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>
        Rating: {movie.vote_average} ({movie.vote_count} votes)
      </p>
    </div>
  );
};

export default MovieDetail;
