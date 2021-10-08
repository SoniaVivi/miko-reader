import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  id: -1,
  chapterId: -1,
  title: "",
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
      state.manga = { ...emptyState };
    },
    setChapterId: {
      reducer(state, action) {
        state.chapterId = action.payload.chapterId;
      },
      prepare(chapterId) {
        return { payload: { chapterId } };
      },
    },
    setTitle: {
      reducer(state, action) {
        state.title = action.payload.title;
      },
      prepare(title) {
        return { payload: { title } };
      },
    },
  },
});

export const { setActiveManga, closeManga, setChapterId, setTitle } =
  slice.actions;

export default slice.reducer;
