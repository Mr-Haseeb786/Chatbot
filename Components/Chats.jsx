import React from "react";
import { getMessages } from "@/utils/db.actions";

const Chats = () => {
  const handleClick = async () => {
    const messages = await getMessages();
  };
  return (
    <>
      <div>
        <h1 className='text-xl mt-2 font-bold'>Chats</h1>
        <button className='btn' onClick={handleClick}>
          Click
        </button>
      </div>
    </>
  );
};

export default Chats;
