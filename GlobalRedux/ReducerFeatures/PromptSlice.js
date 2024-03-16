"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: [],
  mood: "normal",
};

export const PromptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt.push(action.payload.prompt);
      // state.prompt = action.payload.prompt;
      state.mood = action.payload.mood;
    },
  },
});

export const { setPrompt } = PromptSlice.actions;

export default PromptSlice.reducer;
