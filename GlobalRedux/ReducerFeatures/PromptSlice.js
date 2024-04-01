"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageArray: [],
  messageObj: {
    id: "",
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
    },
  },
});

export const { setPrompt } = PromptSlice.actions;

export default PromptSlice.reducer;
