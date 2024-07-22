import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api";
import { GenreType } from "../../util/interface";
import "../header/header.css";
import useFetchMovies from "../../customHooks/useFetchMovies";

const SubHeader = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetchMovies({
    apiToCall: () => fetchGenres(),
  });
  const subHeaderClickHandler = (genre: GenreType) => {
    navigate(`/genre/${genre.id}`, { state: genre.name });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <>
      <div className="genres-header">All Popular Genres</div>
      <div className="genres-subheader">
        {data.genres &&
          data.genres.map((genre: GenreType) => (
            <div
              className="subHeader-generes"
              key={genre.id}
              onClick={() => subHeaderClickHandler(genre)}
            >
              {genre.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default SubHeader;
