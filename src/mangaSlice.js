import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  id: -1,
  chapters: [],
};

export const slice = createSlice({
  name: "manga",
  initialState: emptyState,
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
    closeManga: (state) => {
      //eslint-disable-next-line no-unused-vars
      state.manga = { ...emptyState };
    },
  },
});

export const { setActiveManga, closeManga } = slice.actions;

export default slice.reducer;
