import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllPopularMovies from "./AllPopularMovies"; // Adjust path as needed
import useFetchMovies from "../../customHooks/useFetchMovies";
import { MovieType } from "../../util/interface";
import axios from "axios";
import userEvent from "@testing-library/user-event";

// Mock the API call and useNavigate
jest.mock("../../customHooks/useFetchMovies");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
jest.mock("axios");

// Sample data for testing
const mockData = {
  results: [
    { id: 1, title: "Movie 1", poster_path: "/path1.jpg" },
    { id: 2, title: "Movie 2", poster_path: "/path2.jpg" },
  ] as MovieType[],
};

describe("AllPopularMovies Component", () => {
  const mockUseNavigate = jest.fn();

  beforeEach(() => {
    (useFetchMovies as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    (useFetchMovies as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <AllPopularMovies />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (useFetchMovies as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Something went wrong"),
    });

    render(
      <BrowserRouter>
        <AllPopularMovies />
      </BrowserRouter>
    );

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  test("renders popular movies and handles navigation", async () => {
    render(
      <BrowserRouter>
        <AllPopularMovies />
      </BrowserRouter>
    );

    // Check if movie titles are rendered
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();

    // Check if navigate function is called on icon click
    userEvent.click(screen.getByRole("img")); // Assuming the FontAwesomeIcon is rendered as an img element

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith("/");
    });
  });
});
