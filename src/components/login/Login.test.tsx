import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  const navigate = useNavigate as jest.Mock;

  beforeEach(() => {
    // Clear any previous calls to navigate
    navigate.mockClear();
    localStorage.clear();
  });

  test("renders login form", () => {
    renderWithRouter(<Login />);

    expect(screen.getByText(/tmdb movies/i)).toBeInTheDocument();
    expect(screen.getByTestId("loginHeader")).toBeInTheDocument();
    expect(screen.getByText(/email:/i)).toBeInTheDocument();
    expect(screen.getByText(/password:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows error messages for invalid inputs", async () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByTestId("login-button");

    userEvent.type(emailInput, "invalidemail");
    userEvent.type(passwordInput, "short");
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    }).then(() =>
      expect(
        screen.getByText(
          "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 6 characters long"
        )
      ).toBeInTheDocument()
    );
  });

  test("navigates to home page on successful login", async () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const loginButton = screen.getByRole("button");

    userEvent.type(emailInput, "chethan@gmail.com");
    userEvent.type(passwordInput, "Aa!1123456");
    userEvent.click(loginButton);
    const storedUserId = localStorage.getItem("User_ID");

    await waitFor(() => {
      console.log(storedUserId);
      expect(navigate).toHaveBeenCalledTimes(2);
    });

    // You might want to check the navigation event or the presence of home page content
  });
});
