import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

const storedTheme = (localStorage.getItem("app-theme") as ThemeMode) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: storedTheme,
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", state.mode);
    },
    setTheme(state, action) {
      state.mode = action.payload;
      localStorage.setItem("app-theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
