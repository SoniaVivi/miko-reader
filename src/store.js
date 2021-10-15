import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./mangaSlice";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";
import { apiSlice } from "./apiSlice";
import { aniListSlice } from "./aniListSlice";

const aniListErrorHandler = (storeAPI) => (next) => (action) => {
  if (
    action.type == "aniList/executeQuery/rejected" &&
    action?.payload?.data?.errors.find(
      (error) => error.message == "Invalid token"
    ) &&
    Date.now() -
      Date.parse(storeAPI.getState().user.accessTokenData.expiration) >=
      0
  ) {
    window.open(
      "https://anilist.co/api/v2/oauth/authorize?client_id=6715&response_type=token"
    );
  }
  return next(action);
};

export default configureStore({
  reducer: {
    manga: mangaReducer,
    settings: settingsReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [aniListSlice.reducerPath]: aniListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      aniListSlice.middleware,
      aniListErrorHandler
    ),
});
