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
      state.messageObj = action.payload.messageObj;
      state.messageArray.push(action.payload.messageArray);
    },
    resetMsg: (state) => {
      state.messageObj.message = "";
    },
    setStreamMsg: (state, action) => {
      state.messageObj.isUserPrompt = false;
      state.messageObj.message += action.payload.messageStream;
    },
    setStreaminArray: (state, action) => {
      state.messageArray[state.messageArray.length - 1].message +=
        action.payload.text;
    },
    pushinArray: (state, action) => {
      state.messageArray.push(action.payload);
    },
  },
});

export const {
  setPrompt,
  setStreamMsg,
  resetMsg,
  pushinArray,
  setStreaminArray,
} = PromptSlice.actions;

export default PromptSlice.reducer;
