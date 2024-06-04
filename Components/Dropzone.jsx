import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ setFileContents, fileContents }) {
  // const [fileContents, setFileContents] = useState("");

  const [reading, setReading] = useState(""); // "", "COMPLETED", "READING"

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming only one file is dropped
    const reader = new FileReader();

    reader.onloadstart = () => {
      setReading("READING");
      console.log("reading");
    };

    reader.onload = () => {
      const contents = reader.result;
      setFileContents(contents);
      setReading("COMPLETED");
    };

    reader.onloadend = () => {
      setReading("");
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // console.log(fileContents);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileContents == "" &&
        (isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className='cursor-pointer'>
            Drag 'n' drop some files here, or click to select files
          </p>
        ))}
      {reading == "READING" && <p>Reading...</p>}
      {fileContents && <p className='text-green-500'>Success!</p>}
    </div>
  );
}

export default MyDropzone;
