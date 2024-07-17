// favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenreType } from '../util/interface';

export interface GenereState {
  selectedGenere: GenreType;
}

const initialState: GenereState = {
  selectedGenere: {id: -1, name: ''},
};

const genereSlice = createSlice({
  name: 'genere',
  initialState,
  reducers: {
    selectGenere: (state, action: PayloadAction<GenreType>) => {
      state.selectedGenere = action.payload;
    }
  },
});

export const { selectGenere } = genereSlice.actions;

export default genereSlice.reducer;
