import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MetricsData } from '@/types/metrics';

interface MetricsState {
  data: MetricsData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MetricsState = {
  data: {
    totalProducts: 150,
    totalRevenue: 25000,
    averagePrice: 166.67,
    lowStockItems: 12,
    currentMonth: 'Enero 2024',
    demand: 15000,
    goal: 20000
  },
  status: 'idle',
  error: null,
};

export const fetchMetrics = createAsyncThunk(
  'metrics/fetchMetrics',
  async () => {
    const response = await axios.get('/api/metrics');
    return response.data;
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMetrics.fulfilled, (state, action: PayloadAction<MetricsData>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default metricsSlice.reducer; 