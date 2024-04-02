"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrompt } from "@/GlobalRedux/ReducerFeatures/PromptSlice";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "@reduxjs/toolkit";
import { apiReq } from "@/utils/actions";
import ErrorComp from "./ErrorComp";
const InputBar = () => {
  const [inpPrompt, setInpPrompt] = useState("");
  const [inpMood, setInpMood] = useState("normal");
  const dispatch = useDispatch();
  const { model, api } = useSelector((state) => state.modelName);
  const { messageArray } = useSelector((state) => state.prompt);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["chatbot"],
    mutationFn: (mood) => {
      return apiReq(messageArray, mood, model, api);
    },
    onSuccess: async (stream) => {
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);
        // reading done now displaying left!
      }

      console.log("done");
      const messageObj = {
        id: nanoid(),
        message: chunkValue,
        isUserPrompt: false,
        mood: inpMood,
      };

      dispatch(
        setPrompt({
          messageArray: messageObj,
          messageObj,
        })
      );
    },
    onError: (error) => {
      return error;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageObj = {
      id: nanoid(),
      message: inpPrompt.trim(),
      isUserPrompt: true,
      mood: inpMood,
    };

    dispatch(
      setPrompt({
        messageArray: messageObj,
        messageObj,
      })
    );
    setInpPrompt("");

    // mutate([...messageArray, messageObj], modelN);
    mutate(messageObj.mood);
  };
  if (error) {
    console.log(error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='self-center mb-6 w-[100%] justify-self-center '
    >
      <label className='input input-bordered flex items-center gap-2 relative'>
        <input
          type='text'
          className={`grow rounded placeholder:italic w-full ${
            isPending && "opacity-50"
          }`}
          placeholder='Ask me Anything'
          name='prompt'
          value={inpPrompt}
          onChange={(e) => setInpPrompt(e.target.value)}
          autoComplete='off'
          spellCheck='true'
          disabled={isPending}
        />

        {isPending && (
          <span className='loading loading-bars loading-md absolute left-1/2 translate-x-[-50%]'></span>
        )}

        {/* Dropdown Mood Select */}
        <select
          className={`select border-none select-ghost md:w-max w-24 focus:none ${
            isPending && "opacity-50"
          }`}
          name='mood'
          value={inpMood}
          onChange={(e) => setInpMood(e.target.value)}
        >
          <option>Normal</option>
          <option>Descriptive</option>
          <option>Concise</option>
          <option>Angry</option>
        </select>
        {/* Submission */}
        <button type='submit' disabled={inpPrompt.trim() === ""}>
          {isPending ? (
            <span className='loading loading-ball loading-md'></span>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='25'
              width='16'
              className='cursor-pointer'
              viewBox='0 0 448 512'
            >
              <path
                fill='#B197FC'
                d='M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z'
              />
            </svg>
          )}
        </button>
      </label>
      {error && <ErrorComp message={error.message} />}
    </form>
  );
};

export default InputBar;
