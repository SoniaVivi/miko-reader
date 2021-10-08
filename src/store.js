import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./mangaSlice";
import settingsReducer from "./settingsSlice";
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: {
    manga: mangaReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
