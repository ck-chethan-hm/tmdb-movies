import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api";
import { GenreType } from "../../util/interface";
import { useDispatch } from "react-redux";
import { selectGenere } from "../../store/genereSlice";
import "../header/header.css";
import useFetchMovies from "../../customHooks/useFetchMovies";

const SubHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, error } = useFetchMovies({
    apiToCall: () => fetchGenres(),
  });
  const subHeaderClickHandler = (genre: GenreType) => {
    dispatch(selectGenere(genre));
    navigate(`/genre/${genre.id}`);
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
