import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { MovieType } from "../../util/interface";
import "../movie/movie.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

export interface MovieCardProp {
  movie: MovieType;
}

const MovieCard = ({ movie }: MovieCardProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites: MovieType[] =
    useSelector((state: RootState) => state.favorites.myFavorites) || [];

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
  return (
    <div key={movie.id} className="movie-item">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => navigate(`/movie/${movie.id}`)}
      />
      <div className="movies-bottom">
        <div className="movieCard-bottom-container">
          <div className="moviecard-title">{movie.title}</div>

          <div className="movieCard-rating">
            <span className="movieCard-headLabel">Rating: </span>
            <span>
              {movie.vote_average} ({movie.vote_count} votes)
            </span>
          </div>
        </div>
        <FontAwesomeIcon
          icon={isFavourite(movie.id) ? solidHeart : regularHeart}
          style={isFavourite(movie.id) ? { color: "#e82121" } : {}}
          onClick={() => handleToggleFavorite(movie)}
          className="movie-favoriteIcon"
        />
      </div>
    </div>
  );
};

export default MovieCard;
