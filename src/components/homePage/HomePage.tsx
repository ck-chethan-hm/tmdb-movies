import SubHeader from "../subHeader/SubHeader";
import TrendingMovies from "../trendingMovies/TrendingMovies";
import PopularMovies from "../corousel/PopularMovies";
import "../corousel/carousel.css";

const HomePage = () => {
  return (
    <div className="homePageContainer" style={{ marginBottom: "1rem" }}>
      <SubHeader />
      <div className="popularMovies">
        <PopularMovies />
      </div>
      <TrendingMovies />
    </div>
  );
};

export default HomePage;
