import { createSlice } from "@reduxjs/toolkit";

// Initialize state with persisted `codes` from localStorage if available, or use the default state
const initialState = {
  codes: JSON.parse(localStorage.getItem('codes')) || [
    { code: "", output: "", question: "Sample Question 1" },
    { code: "", output: "", question: "Sample Question 2" },
  ],
};

const codeSlice = createSlice({
  name: "codes",
  initialState,
  reducers: {
    setCodes: (state, action) => {
      // Initialize or replace the `codes` array with the new payload array.
      state.codes = action.payload;
      localStorage.setItem('codes', JSON.stringify(state.codes)); // Persist to localStorage
    },
    updateCode: (state, action) => {
      const { index, code, output } = action.payload;
      if (state.codes[index]) {
        state.codes[index].code = code; // Update the code at the specified index
        state.codes[index].output = output; // Update the output at the specified index
        localStorage.setItem('codes', JSON.stringify(state.codes)); // Persist to localStorage
      }
    },
    updateOutput: (state, action) => {
      const { index, output } = action.payload;
      if (state.codes[index]) {
        state.codes[index].output = output; // Update only the output at the specified index
        localStorage.setItem('codes', JSON.stringify(state.codes)); // Persist to localStorage
      }
    },
  },
});

// Export actions
export const { setCodes, updateCode, updateOutput } = codeSlice.actions;

// Export the reducer
export default codeSlice.reducer;
