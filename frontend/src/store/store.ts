import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import metricsReducer from './features/metrics/metricsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    metrics: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 