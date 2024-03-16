"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const prompt = useSelector((state) => state.prompt);
  console.log(prompt.prompt.length);

  return (
    <div className='border-[1px] border-gray-500 mt-8 h-[30rem] rounded-md'>
      <h2>
        {prompt.prompt.map((p, index) => {
          return <h3 key={index}>{p}</h3>;
        })}
      </h2>
    </div>
  );
  // <div className='h-64 bg-slate-400'></div>;
};

export default ChatArea;
