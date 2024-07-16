import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { MovieType } from "../../util/interface";
import "../movie/movie.css";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";

interface MovieCardProp {
  movie: MovieType;
}

const MovieCard = ({ movie }: MovieCardProp) => {
  const dispatch = useDispatch();
  const favorites: MovieType[] =
    useSelector((state: any) => state.favorites.myFavorites) || [];

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
      />
      <div className="movies-bottom">
        <div className="">
          <div className="moviecard-title">{movie.title}</div>
          <p>Rating: {movie.vote_average}</p>
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
