import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  /* accessTokenData must be in this format:
    {
      accessToken: containing the access token itself,
      expiration: string outputted by: new Date(Date.now() + Number(expiresIn)).toLocaleString(),
      tokenType,
    }
  */
  accessTokenData: {
    accessToken: "",
    expiration: "",
    tokenType: "",
  },
  name: "",
  id: "",
};
export const slice = createSlice({
  name: "user",
  initialState: emptyState,
  reducers: {
    setAccessTokenData: {
      reducer(state, action) {
        state.accessTokenData = action.payload.token;
      },
      prepare(accessToken) {
        return { payload: { token: accessToken } };
      },
    },
    setUserData: {
      reducer(state, action) {
        return { ...state, ...action.payload };
      },
      prepare(name, id) {
        return { payload: { name, id } };
      },
    },
  },
});

export const { setAccessTokenData, setUserData } = slice.actions;

export const tokenSelector = (state) => state.user.accessTokenData;

export const isLoggedIn = (state) => state.user.accessTokenData?.accessToken;

export default slice.reducer;
