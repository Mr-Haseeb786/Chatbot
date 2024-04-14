import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ setFileContents, fileContents }) {
  // const [fileContents, setFileContents] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Assuming only one file is dropped
    const reader = new FileReader();

    reader.onload = () => {
      const contents = reader.result;
      setFileContents(contents);
    };

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // console.log(fileContents);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {fileContents && <p>File contents: {fileContents}</p>}
    </div>
  );
}

export default MyDropzone;
