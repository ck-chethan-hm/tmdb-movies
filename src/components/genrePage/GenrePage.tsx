import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenreType, MovieType } from "../../util/interface";
import { fetchMoviesByGenere } from "../../api";
import { useSelector } from "react-redux";
import MovieCard from "../movie/MovieCard";
import "../movie/movie.css";
import Header from "../header/Header";

const GenrePage = () => {
  const { genre } = useParams();
  const genereSelected: GenreType = useSelector(
    (state: any) => state.generes.selectedGenere
  );
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const getMoviesByGenere = async () => {
      try {
        const moviesData = await fetchMoviesByGenere(genre);
        console.log(moviesData);

        setMovies(moviesData.results);
      } catch (error) {
        console.error(error);
      }
    };
    getMoviesByGenere();
  }, []);

  return (
    <>
      <Header />
      {genereSelected ? (
        <div className="selectedGenresHeading">{`${genereSelected.name} Movies`}</div>
      ) : null}
      <div className="moviesByGenres-container">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  );
};

export default GenrePage;
