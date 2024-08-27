import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("User_ID");
    navigate("/login");
  };

  return (
    <div className="homepage-header">
      <div
        className="tmdb-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        TMDB Movies
      </div>
      <div className="header-rightbar">
        <div
          className="header-favLable"
          onClick={() => navigate("/favourites")}
        >
          My Favourites
        </div>
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setShowLogout(!showLogout)}
            className="header-userIcon"
            data-testid="logout-headerIcon"
          />
          {showLogout && (
            <div className="logout-popup">
              <button
                data-testid="logout-button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
