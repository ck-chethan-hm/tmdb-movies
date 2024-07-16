import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckUser from "./middleware/CheckUser";
import LoginPage from "./components/login/Login";
import HomePage from "./components/homePage/HomePage";
import MyFavourites from "./components/myFavourites/MyFavourites";
import GenrePage from "./components/genrePage/GenrePage";
import MovieDetail from "./components/movie/MovieDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <CheckUser>
              <HomePage />
            </CheckUser>
          }
        />
        <Route
          path="/favourites"
          element={
            <CheckUser>
              <MyFavourites />
            </CheckUser>
          }
        />
        <Route
          path="/genre/:genre"
          element={
            <CheckUser>
              <GenrePage />
            </CheckUser>
          }
        />
        <Route
          path="/movie/:movieId"
          element={
            <CheckUser>
              <MovieDetail />
            </CheckUser>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
