// favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieType } from '../util/interface';

interface FavoritesState {
  myFavorites: MovieType[];
}

const initialState: FavoritesState = {
  myFavorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MovieType>) => {
      state.myFavorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.myFavorites = state.myFavorites.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
