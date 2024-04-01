import React from "react";
import InputBar from "@/Components/InputBar";
import ChatArea from "@/Components/ChatArea";
import Navbar from "@/Components/Navbar";

const ChatPage = () => {
  return (
    <main className=''>
      <Navbar />
      <div className='grid grid-cols-1 h-full md:gap-3 gap-12 w-[90%] mx-auto max-w-screen-md'>
        <ChatArea />
        <InputBar />
      </div>
    </main>
  );
};

export default ChatPage;
