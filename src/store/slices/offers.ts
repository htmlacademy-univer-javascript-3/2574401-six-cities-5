import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../../types/offer';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'offers/fetchOffers',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке предложений';
      });
  },
});

export default offersSlice.reducer;
