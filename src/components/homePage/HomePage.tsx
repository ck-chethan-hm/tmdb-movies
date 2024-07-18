import React from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../subHeader/SubHeader";
import TrendingMovies from "../trendingMovies/TrendingMovies";
import PopularMovies from "../corousel/PopularMovies";
import "../corousel/carousel.css";

const HomePage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const userId = localStorage.getItem("User_ID");
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="homePageContainer">
      <SubHeader />
      <div className="popularMovies">
        <PopularMovies />
      </div>
      <TrendingMovies />
    </div>
  );
};

export default HomePage;
