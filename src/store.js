import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./mangaSlice";
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: { manga: mangaReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
