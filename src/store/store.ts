// store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favouriteSlice';
import genereReducer from './genereSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    generes: genereReducer
  },
});

export default store;
