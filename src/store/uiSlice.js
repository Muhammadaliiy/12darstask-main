import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  imageErrorByProductId: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    setImageError(state, action) {
      const productId = action.payload;
      state.imageErrorByProductId[productId] = true;
    },
  },
});

export const { openModal, closeModal, setImageError } = uiSlice.actions;

export const selectShowModal = (state) => state.ui.showModal;
export const selectIsImageErrorById = (state, productId) => Boolean(state.ui.imageErrorByProductId[productId]);

export default uiSlice.reducer;