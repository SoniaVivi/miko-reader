import { createSlice } from "@reduxjs/toolkit";

const defaultStyles = {
  maxWidth: "960px",
  navbarHeight: "48px",
  navTransitionTiming: "250ms ease-out 50ms",
  secondLevelZIndex: "3",
  thirdLevelZIndex: "5",
  forthLevelZIndex: "7",
  highestLevelZIndex: "99999999999999",
  coverWidth: "210px",
  coverHeight: "300px",
};

const lightTheme = {
  ...defaultStyles,
  bodyBackground: "#f5f5f5",
  mainBackground: "#ffffff",
  inputBackground: "#f1f1f1",
  loadingBackground: "#a9a9a9",
  hoverBackground: "rgba(85, 205, 252, 0.4)",
  hintBackground: "rgba(0, 0, 0, 0.8)",
  extraLightBorder: "#edeff1",
  lightBorder: "#e5e4e2",
  darkBorder: "#c0c0c0",
  inputFocusBorder: "#b2beb5",
  home: "#000000",
  hintColor: "#ffffff",
  textColor: "#000000",
  invertTextColor: "#ffffff",
  currentPage: "#80aedf",
  current: "#bbfdb4",
  read: "#bcd5f0",
  lightText: "#808080",
};

const darkTheme = {
  ...defaultStyles,
  bodyBackground: "#000000",
  mainBackground: "#0a090c",
  inputBackground: "#131217",
  loadingBackground: "#706c61",
  hoverBackground: "rgba(28, 109, 176, 0.4)",
  hintBackground: "rgba(255, 255, 255, 0.8)",
  extraLightBorder: "#1c6db0",
  lightBorder: "#0d3759",
  darkBorder: "#b8d9f4",
  inputFocusBorder: "#77b6ea",
  home: "#ffffff",
  hintColor: "#000000",
  textColor: "#ffffff",
  invertTextColor: "#000000",
  currentPage: "#80aedf",
  current: "#80aedf",
  read: "#bcd5f0",
  lightText: "#d4d4d4",
};

const emptyState = {
  showNav: true,
  language: "en",
  pageLayout: "dual",
  currentlyViewing: 2,
  pageDirection: "toLeft",
  theme: { name: "light", style: lightTheme },
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
    toggleTheme: {
      reducer(state) {
        switch (state.theme.name) {
          case "light":
            state.theme = { name: "dark", style: darkTheme };
            break;
          case "dark":
            state.theme = { name: "light", style: lightTheme };
            break;
        }
      },
      prepare() {
        return { payload: {} };
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
  toggleTheme,
} = slice.actions;

export default slice.reducer;
