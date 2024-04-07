import Link from "next/link";
import { getMessages } from "@/utils/db.actions";

const homePage = async () => {
  const messages = await getMessages();
  console.log(messages);

  return (
    <div className='grid place-items-center h-screen'>
      <div className='text-center'>
        <h2 className='text-3xl mb-6 font-medium'>
          Welcome to Next.js Chatbot
        </h2>
        <button className='btn btn-active btn-primary'>
          <Link href='/chatbot'>Start Chatting!</Link>
        </button>
      </div>
    </div>
  );
};

export default homePage;
