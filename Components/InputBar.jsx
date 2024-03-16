"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPrompt } from "@/GlobalRedux/ReducerFeatures/PromptSlice";
const InputBar = () => {
  const [inpPrompt, setInpPrompt] = useState("");
  const dispatch = useDispatch();
  let prompt = useSelector((state) => state.prompt);
  // console.log(prompt);

  const displayConsole = () => {
    const lastEl = prompt.prompt.length + 1;

    console.log(prompt.prompt[lastEl]);
  };
  const handleSubmit = (e) => {
    {
      e.preventDefault();

      dispatch(
        setPrompt({
          prompt: inpPrompt.trim(),
          mood: e.currentTarget.mood.value,
        })
      );

      setInpPrompt("");

      displayConsole();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='self-end mb-6 w-full justify-self-center'
    >
      <label className='input input-bordered flex items-center gap-2'>
        <input
          type='text'
          className='grow rounded placeholder:italic'
          placeholder='Ask me Anything'
          name='prompt'
          value={inpPrompt}
          onChange={(e) => setInpPrompt(e.target.value)}
        />
        {/* Dropdown Mood Select */}
        <select
          className='select border-none select-ghost w-max max-w-xs focus:none'
          name='mood'
        >
          <option>Normal</option>
          <option>Svelte</option>
          <option>Vue</option>
          <option>React</option>
        </select>
        {/* Submission */}
        <button type='submit' disabled={inpPrompt.trim() === ""}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='25'
            width='19'
            className='cursor-pointer'
            viewBox='0 0 448 512'
          >
            <path
              fill='#B197FC'
              d='M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z'
            />
          </svg>
        </button>
      </label>

      {/* <label>
        <input
          type='text'
          placeholder='Ask me anything'
          className='input-bordered w-full border-gray-300 border-2 p-2 rounded'
        />
        </label> */}
    </form>
  );
};

export default InputBar;
