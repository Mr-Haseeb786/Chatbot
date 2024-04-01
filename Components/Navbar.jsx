"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setModel } from "@/GlobalRedux/ReducerFeatures/ModelSlice";
const Navbar = () => {
  const [model, setInModel] = useState("GPT-3.5-Turbo");
  const modelN = useSelector((state) => state.modelName);

  console.log(modelN);

  const dispatch = useDispatch();

  const changeFunc = (e) => {
    setInModel(e.target.value);
    dispatch(
      setModel({
        model: e.target.value,
      })
    );
  };

  return (
    <nav>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <Sidebar />
        </div>
        <div className='navbar-center '>
          <select
            className='select select-ghost w-full max-w-xs text-xl font-bold'
            value={model}
            onChange={changeFunc}
          >
            <option className='text-sm pr-0'>GPT-3.5-Turbo</option>
            <option className='text-sm'>GPT-4</option>
            <option className='text-sm'>Gemini-Pro</option>
          </select>
        </div>
        <div className='navbar-end'></div>
      </div>
    </nav>
  );
};

export default Navbar;
