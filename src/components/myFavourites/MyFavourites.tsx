import { useSelector } from "react-redux";
import { MovieType } from "../../util/interface";
import MovieCard from "../movie/MovieCard";
import "../movie/movie.css";
import Header from "../header/Header";

const MyFavourites = () => {
  const favorites: MovieType[] =
    useSelector((state: any) => state.favorites.myFavorites) || [];

  return (
    <>
      <Header />
      <div className="myFavourites-label">My Favourites</div>
      <div className="favouriteMovies-container scrollbar-hide">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default MyFavourites;
