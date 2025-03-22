import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Тип для состояния
interface PageState {
  currentPage: string;
}

// Начальное состояние
const initialState: PageState = {
  currentPage: "Fundraising",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
