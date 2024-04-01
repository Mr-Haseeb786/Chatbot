"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [swap, setSwap] = useState(true);

  return (
    <aside>
      <button
        className={`btn btn-ghost btn-circle ${isOpen && "hidden"}`}
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 w-1/2 md:w-1/4 ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } h-full bg-primary-content/100 overflow-hidden transition-all z-20`}
      >
        <article className='relative mx-4'>
          <div className='flex justify-end my-2 '>
            <button
              className='btn btn-ghost btn-circle '
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h7'
                />
              </svg>
            </button>
          </div>
          <div>
            <Link href='/'>
              <h1 className='text-xl font-bold text-left'>Home</h1>
            </Link>
          </div>
        </article>
        <article>
          <label className='swap swap-flip'>
            <input
              type='checkbox'
              checked={swap}
              onChange={() => setSwap(!swap)}
            />
            <div className='swap-on btn '>ConvoAI</div>
            <div className='swap-off btn'>ZukiJourney</div>
          </label>
          {/* <label className='flex cursor-pointer gap-2'>
            <span className='label-text'>Current</span>
            <input
              type='checkbox'
              value='synthwave'
              className='toggle theme-controller'
            />
            <span className='label-text'>Synthwave</span>
          </label> */}
        </article>
      </div>
    </aside>
  );
};

export default Sidebar;
