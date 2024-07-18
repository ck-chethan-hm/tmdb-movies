import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";

const getAuthToken = () => {
  return "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTc0N2FhY2RiMGY5NGMzZDZmYWQxMmJmN2QzNGQzMCIsIm5iZiI6MTcyMDU1MTM1NS45NTQzODQsInN1YiI6IjY0YjRlYTAyZTBjYTdmMDE0NDJhZTFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j6h_wbXPT3AD16sbuIdk-lagOdThRgSCLHcm4t03dQM";
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get("/genre/movie/list?language=en");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopularMovies = async () => {
  const response = await axiosInstance.get(
    "movie/popular?language=en-US&page=1"
  );
  return response.data;
};

export const fetchTrendingMovies = async () => {
  const response = await axiosInstance.get(
    "/trending/movie/day?language=en-US"
  );
  return response.data;
};

export const fetchMovieDetail = async (movie_id) => {
  const response = await axiosInstance.get(`movie/${movie_id}?language=en-US`);
  return response.data;
};

export const fetchMoviesByGenere = async (genre_id) => {
  const response = await axiosInstance.get(
    `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre_id}`
  );
  return response.data;
};
