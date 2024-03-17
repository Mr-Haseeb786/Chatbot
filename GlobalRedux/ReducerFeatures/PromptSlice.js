"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageArray: [],
  messageObj: {
    message: "",
    isUserPrompt: true,
    mood: "normal",
  },
};

export const PromptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.messageArray.push(action.payload.messageArray);
      state.messageObj = action.payload.messageObj;
      // state.prompt = action.payload.prompt;
      // state.mood = action.payload.mood;
      // state.isUserPrompt = action.payload.isUserPrompt;
    },
  },
});

export const { setPrompt } = PromptSlice.actions;

export default PromptSlice.reducer;
