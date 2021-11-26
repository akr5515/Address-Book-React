import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { RootState } from './';
import { defaultNationalities } from 'data/defaultNationalities';
import { Nationality } from 'models/Nationality';

export interface SettingsState {
  nationalities: Nationality[];
}

export const initialState: SettingsState = {
  nationalities: [...defaultNationalities],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    selectedNationalitiesUpdated: (
      state: SettingsState,
      action: PayloadAction<Nationality[]>,
    ) => {
      state.nationalities = action.payload;
    },
  },
});

//actions
export const { selectedNationalitiesUpdated } = settingsSlice.actions;
//selectors
export const settingsSelector = (state: RootState) => state.settings;
export const nationalitiesSelector = (state: RootState) =>
  state.settings.nationalities;

export const selectedNationalityCodes = createSelector(
  nationalitiesSelector,
  nationalities => {
    const selectedNationalities = nationalities.filter(
      nationality => nationality.isSelected,
    );

    return selectedNationalities.map(nationality => nationality.code);
  },
);
export default settingsSlice.reducer;
