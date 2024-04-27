import {useMedia, useFile} from "../hooks/ApiHooks.js";
import { useState } from "react"
import {Navigate} from "react-router-dom";

const Upload = () => {

  const [file, setFile] = useState(null);
  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const handleInputChange = (evt) => {
    setInputs({
      ...inputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    doUpload();
  }

  const { postFile } = useFile();
  const { postMedia } = useMedia();

  const doUpload = async () => {
    const token = localStorage.getItem('token');
    try {
      const fileData = await postFile(file, token);
      await postMedia(fileData.data, inputs, token);
      return<Navigate to={"/"} />
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={!(file && inputs.title.length > 3)}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
