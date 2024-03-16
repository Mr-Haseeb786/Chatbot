import Link from "next/link";

const homePage = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='text-center'>
        <h2 className='text-3xl mb-6 font-medium'>
          Welcome to Next.js Chatbot
        </h2>
        <button className='bg-blue-500 py-3 font-bold px-5 rounded text-white'>
          <Link href='/chatbot'>Start Chatting!</Link>
        </button>
      </div>
    </div>
  );
};

export default homePage;
