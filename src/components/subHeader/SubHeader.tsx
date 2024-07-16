import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api";
import { GenreType } from "../../util/interface";
import { useDispatch } from "react-redux";
import { selectGenere } from "../../store/genereSlice";
import "../header/header.css";
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
    <>
      <div className="genres-header">All Popular Genres</div>
      <div className="genres-subheader">
        {genres &&
          genres.map((genre: GenreType) => (
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
