"use client";

import React, { useState } from "react";
import MyDropzone from "./Dropzone";

const Modal = () => {
  const [fileContents, setFileContents] = useState("");
  console.log(fileContents);
  return (
    <div>
      <button
        className='btn'
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button>
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <MyDropzone
            setFileContents={setFileContents}
            fileContents={fileContents}
          />
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn' onClick={() => setFileContents("")}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
