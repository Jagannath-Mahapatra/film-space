import { configureStore } from '@reduxjs/toolkit';
import configurationReducer from './configurationSlice';

export const store = configureStore({
  reducer: {
    configuration: configurationReducer,
  },
});
