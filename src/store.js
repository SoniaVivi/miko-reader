import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./mangaSlice";

export default configureStore({
  reducer: { manga: mangaReducer },
});
