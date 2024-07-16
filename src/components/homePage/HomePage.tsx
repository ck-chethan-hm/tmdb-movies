import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import SubHeader from "../subHeader/SubHeader";
import Carousel from "../corousel/Corousel";
import TrendingMovies from "../trendingMovies/TrendingMovies";

const HomePage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const userId = localStorage.getItem("User_ID");
    if (!userId) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <SubHeader />
      <Carousel />
      <TrendingMovies />
    </div>
  );
};

export default HomePage;
