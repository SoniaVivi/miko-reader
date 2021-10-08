import { createSlice } from "@reduxjs/toolkit";

//eslint-disable-next-line no-unused-vars
const emptyState = {
  showNav: true,
  language: "en",
  pageLayout: "dual",
  currentlyViewing: 2,
  pageDirection: "toLeft",
};

export const slice = createSlice({
  name: "settings",
  initialState: emptyState,
  reducers: {
    toggleNav: {
      reducer(state) {
        state.showNav = !state.showNav;
      },
      prepare() {
        return { payload: {} };
      },
    },
    setLanguage: {
      reducer(state, action) {
        state.language = action.payload.language;
      },
      prepare(language) {
        return { payload: { language } };
      },
    },
    setPageLayout: {
      reducer(state, action) {
        state.pageLayout = action.payload.pageLayout;
      },
      prepare(pageLayout) {
        return { payload: { pageLayout } };
      },
    },
    setCurrentlyViewing: {
      reducer(state, action) {
        state.currentlyViewing = action.payload.quantity;
      },
      prepare(quantity) {
        return { payload: { quantity } };
      },
    },
    setPageDirection: {
      reducer(state, action) {
        state.pageDirection = action.payload.direction;
      },
      prepare(direction) {
        return { payload: { direction } };
      },
    },
  },
});

export const {
  toggleNav,
  setLanguage,
  setPageLayout,
  setCurrentlyViewing,
  setPageDirection,
} = slice.actions;

export default slice.reducer;
