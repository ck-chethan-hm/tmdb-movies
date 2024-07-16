import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api";
import { GenreType } from "../../util/interface";
import { useDispatch } from "react-redux";
import { selectGenere } from "../../store/genereSlice";

const SubHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genres, setGenres] = useState<GenreType[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getGenres();
  }, []);

  const subHeaderClickHandler = (genre: GenreType) => {
    dispatch(selectGenere(genre));
    navigate(`/genre/${genre.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        flexWrap: "wrap",
      }}
    >
      {genres &&
        genres.map((genre: GenreType) => (
          <button key={genre.id} onClick={() => subHeaderClickHandler(genre)}>
            {genre.name}
          </button>
        ))}
    </div>
  );
};

export default SubHeader;
