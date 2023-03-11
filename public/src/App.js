// Dependencies
import React, { useState } from 'react';
import axios from 'axios';

// Import App CSS
import './App.css';

const App = props => {
  // Set state
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('alert-success');

  // listen for file on change and set state when changed
  const onChange = e => {
    setFiles(e.target.files);
  };

  // post files to upload enpoint.
  // Server will then pass to cloudinary via multer
  const onSubmit = async e => {
    // prevent form from submitting
    e.preventDefault();

    // init new form data
    const formData = new FormData();
    // loop through files to be uploaded and append them to form data
    for (let file of files) {
      formData.append('productImages', file);
    }

    try {
      // make post request to api endpoint
      const request = await axios.post(
        'http://localhost:5000/api/v1/images/upload',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );
      const response = await request.data;

      // set message & class type to server response
      setAlertType(response.alertType);
      setMessage(response.msg);

      // reset form data and message
      setTimeout(() => {
        setMessage('');
        document.querySelector('form').reset();
      }, 3000);
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <div className='card'>
      <h1 className='display-3'>File Uploader</h1>
      <h5>Upload Images To Cloudinary</h5>
      {message && (
        <p className={`alert ${alertType}`} role='alert'>
          {message}
        </p>
      )}
      <hr />
      <form onSubmit={onSubmit}>
        <div className='file-selector'>
          <input
            multiple
            type='file'
            name='files'
            accept='image/jpg, image/jpeg, image/png'
            id='productImages'
            onChange={onChange}
            className='form-control'
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
