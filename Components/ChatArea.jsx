"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ChatArea = async () => {
  const prompt = useSelector((state) => state.prompt);

  console.log(prompt);

  return (
    <div className='border-[1px] border-gray-500 sm:h-[30rem] h-[37rem] rounded-md overflow-auto z-10 '>
      <div className='chatResponses mt-2 mb-4'>
        {prompt.messageArray.map((p, index) => {
          if (!p.isUserPrompt) {
            let botMsg = p.message;
            const pattern = "<SYSTEM>([\\s\\S]*?)<\\/SYSTEM>";
            const regex = new RegExp(pattern);

            const match = regex.exec(botMsg);

            if (match) {
              botMsg = match[1];
            }

            const parts = botMsg.replace(/\\n/g, "\n").split("\n");

            return (
              <>
                <div className='chat chat-start ml-2 my-1' key={p.id}>
                  <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                      <img alt='bot-img' src='/bot-img.png' />
                    </div>
                  </div>
                  <div className='chat-bubble h-max'>
                    {parts.map((part, index) => (
                      <span key={index}>
                        {part}
                        {index !== parts.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );
          } else
            return (
              <>
                <div className='chat chat-end mr-2 my-1' key={index}>
                  <div className='chat-bubble h-max'>{p.message}</div>
                </div>
              </>
            );
        })}
      </div>
    </div>
  );
};

export default ChatArea;
