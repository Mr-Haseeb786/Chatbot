import React from "react";
import InputBar from "@/Components/InputBar";
import ChatArea from "@/Components/ChatArea";

const ChatPage = () => {
  return (
    <main className='grid grid-cols-1 h-screen col'>
      <div className='grid grid-cols-1 h-screen w-11/12 mx-auto'>
        <ChatArea />
        <InputBar />
      </div>
    </main>
  );
};

export default ChatPage;
