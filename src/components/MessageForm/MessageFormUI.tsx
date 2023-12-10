import { useState } from "react";
import { useCallback } from "react";
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {useDropzone} from "react-dropzone";

const MessageFormUI = ({
    setAttachment,
    message,
    handleChange,
    handleSubmit
}) => {

    // preview image that we want
    const [preview, setPreview] = useState<string>("");

    const onDrop = useCallback ((acceptedFiles) => {

        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            console.log(acceptedFiles);
            setAttachment(file);

            // create a preview URL for the dropped file
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    }, [setAttachment]);

    const {getRootProps, getInputProps, open, isDragActive} = useDropzone({
        accept: '.jpeg, .jpg, .png',
        // accept: {'images': ['image/jpeg', 'image/jpg', 'image/png']},
        multiple: false,
        noClick: true,
        onDrop: onDrop
    });
    return (
        <div className="message-form-container"> 
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
                )
            }
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
                <div className="message-form-icons">
                
                    <div {...getRootProps()}>              
                        <input {...getInputProps()}/>
                        <div className="dropzone-content__container">

                        <PaperClipIcon
                            className="message-form-icon-clip"
                            onClick={open}
                        />
                            {
                                isDragActive ? (
                                <p className="dropzone-content"> Drop the files here ... </p> ):(
                                <p className="dropzone-content">Drag and drop the files here, or click to select files</p>)
                            }        
                        </div>

                    </div>
                    {/* Method 2: using Dropzone component */}
                    {/* <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        noClick={true}
                        // onDrop={(acceptedFiles) => {
                        //     setAttachment(acceptedFiles[0]);
                        //     setPreview(URL.createObjectURL(acceptedFiles[0]));
                        //     // if (acceptedFiles.length > 0) {
                        //     //     const file = acceptedFiles[0];
                        //     //     // console.log(isDragActive);
                        //     //     console.log(acceptedFiles);
                        //     //     setAttachment(file.name);
                    
                        //     //     // create a preview URL for the dropped file
                        //     //     const previewURL = URL.createObjectURL(file);
                        //     //     setPreview(previewURL);
                        //     // }
                        // }}
                        onDrop={onDrop}
                    >
                        {({ getRootProps, getInputProps, open }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PaperClipIcon
                                    className="message-form-icon-clip"
                                    onClick={open}
                                />
                            </div>
                        )}
                    </Dropzone> */}
                    
                    <hr className="vertical-line"/>
                    {/* Submit  */}
                    <PaperAirplaneIcon 
                        className="message-form-icon-airplane"
                        onClick={() => {
                            setPreview("");
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
  )
}

export default MessageFormUI
