import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionsCode: JSON.parse(localStorage.getItem('questionsCode')) || {},
};

const questionSlice = createSlice({
  name: "questionsCode",
  initialState,
  reducers: {
    setQues: (state, action) => {
      if (typeof action.payload !== 'object' || action.payload === null) {
        console.error("Invalid payload for setQues. Expected an object.");
        return;
      }
      state.questionsCode = action.payload;
      localStorage.setItem('questionsCode', JSON.stringify(state.questionsCode));
    },
    addQues: (state, action) => {
      const { question, code, output, language } = action.payload;
      state.questionsCode[question] = state.questionsCode[question] || [];
      state.questionsCode[question].push({ code, output, language });
      localStorage.setItem('questionsCode', JSON.stringify(state.questionsCode));
    },
    updateQues: (state, action) => {
      const { question, index, code, output, language } = action.payload;
      if (!state.questionsCode[question] || !state.questionsCode[question][index]) {
        console.warn(`No entry found for question: ${question}, index: ${index}`);
        return;
      }
      state.questionsCode[question][index] = {
        ...state.questionsCode[question][index],
        ...(code !== undefined && { code }),
        ...(output !== undefined && { output }),
        ...(language !== undefined && { language }),
      };
      localStorage.setItem('questionsCode', JSON.stringify(state.questionsCode));
    },
    deleteQues: (state, action) => {
      const { question, index } = action.payload;
      if (!state.questionsCode[question] || !state.questionsCode[question][index]) {
        console.warn(`No entry found for question: ${question}, index: ${index}`);
        return;
      }
      state.questionsCode[question].splice(index, 1);
      if (state.questionsCode[question].length === 0) {
        delete state.questionsCode[question];
      }
      localStorage.setItem('questionsCode', JSON.stringify(state.questionsCode));
    },
  },
});

export const { setQues, addQues, updateQues, deleteQues } = questionSlice.actions;
export default questionSlice.reducer;
