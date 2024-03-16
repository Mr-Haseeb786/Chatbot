"use client";
import { configureStore } from "@reduxjs/toolkit";
import PromptSlice from "@/GlobalRedux/ReducerFeatures/PromptSlice";

export const store = configureStore({
  reducer: {
    prompt: PromptSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
