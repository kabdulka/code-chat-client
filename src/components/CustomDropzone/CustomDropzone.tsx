import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { PaperClipIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

function CustomDropZone() {

    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<string>("");
    // preview image that we want
    const [preview, setPreview] = useState<string>("");

    const handleChange = (event) => setMessage(event.target.value)


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        console.log(isDragActive);
        console.log(acceptedFiles)
        setAttachment(file.name);

        // create a preview URL for the dropped file
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL)
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({onDrop})

  return (
    <div className='message-form-container'>
        <div>
        {
                preview && (
                    <div className="message-form-preview">
                        <img className="message-form-preview-image" 
                            alt="message-form-preview"
                            src={preview} 
                            // onLoad frees up resources when image not needed anymore
                            onLoad={() => URL.revokeObjectURL(preview)}
                        />
                        <XMarkIcon 
                            className="message-form-icon-x"
                            onClick={() => {
                                setPreview("");
                                setAttachment("");
                            }}
                        />
                      
                    </div>
                )}           
        </div>
        <div className="message-form">

            <div className="message-form-input-container">
                        <input 
                            className="message-form-input"
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="Send a Message..."
                        />
                    </div>
            </div>
            <div className="message-form-icons">     
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        <PaperClipIcon
          className="message-form-icon-clip"
          onClick={open}
        />
    </div>
        </div>
        </div>
  )
}

export default CustomDropZone