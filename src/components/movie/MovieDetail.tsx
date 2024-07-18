import { fetchMovieDetail } from "../../api";
import { MovieType } from "../../util/interface";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favouriteSlice";
import useFetchMovies from "../../customHooks/useFetchMovies";
import { RootState } from "../../store/store";
import "./movie.css";

const MovieDetail = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const favorites: MovieType[] =
    useSelector((state: RootState) => state.favorites.myFavorites) || [];

  const { data, error, loading } = useFetchMovies({
    apiToCall: () => fetchMovieDetail(movieId),
  });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <div className="movieDetail-container">
        <img
          className="movieDetail-image"
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
        />
        <div className="movieDetail-right">
          <div className="moviedetail-title">{data.title}</div>
          <div className="movieDetail-overview">{data.overview}</div>
          <div className="movieDetail-date">
            <span className="movieDetail-headLabel">Release Date: </span>
            <span>{data.release_date}</span>
          </div>
          <div className="movieDetail-rating">
            <span className="movieDetail-headLabel">Rating: </span>
            <span>
              {data.vote_average} ({data.vote_count} votes)
            </span>
          </div>

          <button
            className="movieDetail-favouriteButton"
            type="submit"
            onClick={() => handleToggleFavorite(data)}
            style={
              isFavourite(data.id)
                ? {
                    backgroundColor: "tomato",
                    color: "white",
                  }
                : {}
            }
          >
            {isFavourite(data.id) ? "Remove Favourite" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
