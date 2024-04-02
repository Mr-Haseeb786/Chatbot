"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { escapeHtml } from "sanitize-html";

const ChatArea = () => {
  const prompt = useSelector((state) => state.prompt);

  console.log(prompt);

  return (
    <div className='border-[1px] border-gray-500 sm:h-[30rem] h-[37rem] rounded-md overflow-auto z-10 '>
      <div className='chatResponses mt-2 mb-4'>
        {prompt.messageArray.map((p, index) => {
          return (
            <>
              {p.isUserPrompt ? (
                <div className='chat chat-end mr-2 my-1' key={index}>
                  <div className='chat-bubble h-max'>{p.message}</div>
                </div>
              ) : (
                <div className='chat chat-start ml-2 my-1' key={p.id}>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img
                        alt='Tailwind CSS chat bubble component'
                        src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                      />
                    </div>
                  </div>
                  <div className='chat-bubble h-max'>
                    {() => escapeHtml(p.message)}
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ChatArea;
