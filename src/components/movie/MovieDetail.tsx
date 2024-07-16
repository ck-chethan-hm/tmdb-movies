import { useState, useEffect } from "react";
import { fetchMovieDetail } from "../../api";
import { MovieType } from "../../util/interface";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./movie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const favorites: MovieType[] =
    useSelector((state: any) => state.favorites.myFavorites) || [];

  const [movie, setMovie] = useState<MovieType | null>(null);
  const { movieId } = useParams();
  console.log(movieId);

  const isFavourite = (movieId: number) => {
    return favorites.some((movie: MovieType) => movie.id === movieId);
  };

  const handleToggleFavorite = (movie: MovieType) => {
    if (isFavourite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

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
    <>
      <Header />
      <div className="movieDetail-container">
        <img
          className="movieDetail-image"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movieDetail-right">
          <div className="moviedetail-title">{movie.title}</div>
          <div className="movieDetail-overview">{movie.overview}</div>
          <div className="movieDetail-date">
            <span className="movieDetail-headLabel">Release Date: </span>
            <span>{movie.release_date}</span>
          </div>
          <div className="movieDetail-rating">
            <span className="movieDetail-headLabel">Rating: </span>
            <span>
              {movie.vote_average} ({movie.vote_count} votes)
            </span>
          </div>

          <button
            className="movieDetail-favouriteButton"
            type="submit"
            onClick={() => handleToggleFavorite(movie)}
            style={
              isFavourite(movie.id)
                ? {
                    backgroundColor: "tomato",
                    color: "white",
                  }
                : {}
            }
          >
            {isFavourite(movie.id) ? "Remove Favourite" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
