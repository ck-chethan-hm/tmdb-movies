// store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { FavoritesState } from './favouriteSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export interface RootState {
  favorites: FavoritesState;
}

export default store;
