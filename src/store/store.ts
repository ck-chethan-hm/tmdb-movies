// store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { FavoritesState } from './favouriteSlice';
import genereReducer, { GenereState } from './genereSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    generes: genereReducer
  },
});

export interface RootState {
  favorites: FavoritesState;
  generes: GenereState
}

export default store;
