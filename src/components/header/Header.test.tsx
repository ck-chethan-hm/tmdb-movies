import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header"; // Adjust the path as needed
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";
import MyFavourites from "../myFavourites/MyFavourites";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  const navigate = useNavigate as jest.Mock;

  beforeEach(() => {
    navigate.mockClear();
    localStorage.clear(); // Clear local storage before each test
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<MyFavourites />} />
        </Routes>
      </BrowserRouter>
    );
  };

  test("renders the Header component", () => {
    renderWithRouter(<Header />);
    expect(screen.getByText("TMDB Movies")).toBeInTheDocument();
    expect(screen.getByText("My Favourites")).toBeInTheDocument();
  });

  test("navigates to home page on clicking the logo", () => {
    renderWithRouter(<Header />);
    userEvent.click(screen.getByText("TMDB Movies"));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  test("navigates to favourites page on clicking My Favourites", () => {
    renderWithRouter(<Header />);
    userEvent.click(screen.getByText("My Favourites"));
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  test("shows logout button and navigates to login page on logout", async () => {
    renderWithRouter(<Header />);

    // Click on user icon to show the logout button
    userEvent.click(screen.getByTestId("logout-headerIcon"));
    userEvent.click(await screen.findByRole("button", { name: /logout/i }));

    // Click on logout button
    userEvent.click(screen.getByText("Logout"));

    // Check if local storage item is removed
    await waitFor(() => {
      expect(localStorage.getItem("User_ID")).toBeNull();
    }).then(() => expect(navigate).toHaveBeenCalledTimes(2));
  });
});
