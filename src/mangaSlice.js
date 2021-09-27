import { createSlice } from "@reduxjs/toolkit";

//eslint-disable-next-line no-unused-vars
const emptyState = {
  id: -1,
  chapterId: -1,
  showNav: true,
  language: "",
};

//eslint-disable-next-line no-unused-vars
const testState = {
  id: "6670ee28-f26d-4b61-b49c-d71149cd5a6e",
  chapterId: "478a3742-b70a-4f4c-892b-b9b1b6ad4fb1",
  showNav: true,
  language: "en",
};

export const slice = createSlice({
  name: "manga",
  initialState: testState, // ===========CHANGE THIS FOR PRODUCTION===========
  reducers: {
    setActiveManga: {
      reducer(state, action) {
        return { ...state, ...action.payload };
      },
      prepare(id) {
        return {
          payload: {
            id,
          },
        };
      },
    },
    toggleNav: {
      reducer(state) {
        state.showNav = !state.showNav;
      },
      prepare() {
        return { payload: {} };
      },
    },
    closeManga: (state) => {
      state.manga = { ...emptyState };
    },
    setLanguage: {
      reducer(state, action) {
        state.language = action.payload.language;
      },
      prepare(language) {
        return { payload: { language } };
      },
    },
  },
});

export const { setActiveManga, closeManga, toggleNav, setLanguage } =
  slice.actions;

export default slice.reducer;
