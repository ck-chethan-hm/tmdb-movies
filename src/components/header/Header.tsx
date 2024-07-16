import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("User_ID");
    navigate("/login");
  };

  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        height: "40px",
        backgroundColor: "red",
        margin: "0",
      }}
    >
      <div className="">
        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          TMDB
        </h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => navigate("/favourites")}>My Favourites</button>
        <div style={{ position: "relative" }}>
          <img
            src="path/to/user-logo.png"
            alt="User Logo"
            onClick={() => setShowLogout(!showLogout)}
            style={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          {showLogout && (
            <div
              style={{
                position: "absolute",
                right: 0,
                background: "white",
                border: "1px solid black",
                borderRadius: "5px",
              }}
            >
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
