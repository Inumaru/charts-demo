import { configureStore } from '@reduxjs/toolkit';
import chartsReducer from "./ChartSlice"

export const store = configureStore({
    reducer: {
        charts: chartsReducer,
    },
});
