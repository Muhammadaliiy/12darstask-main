import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const desserts = await apiService.getDesserts();
  return desserts;
});

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load products. Please try again later.';
      });
  },
});

export const selectProducts = (state) => state.products.products;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export default productsSlice.reducer;