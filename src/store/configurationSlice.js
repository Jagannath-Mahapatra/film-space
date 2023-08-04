import { createSlice } from '@reduxjs/toolkit';

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState: {
    imageBaseUrl: '',
    videosQueryParam: '?append_to_response=videos',
    youtubeEndpoint: 'https://www.youtube.com/embed/',
    changeKeysConfigDetails: [],
    imageConfigDetails: {},
  },
  reducers: {
    setConfiguration: (state, action) => {
      state.changeKeysConfigDetails = action.payload.change_keys;
      state.imageConfigDetails = action.payload.images;
      state.imageBaseUrl =
        action.payload.images.base_url +
        action.payload.images.backdrop_sizes[3];
    },
  },
});

export const { setConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;
