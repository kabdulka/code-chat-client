import { useState } from "react";
import { useCallback } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {useDropzone} from "react-dropzone";

const StandardMessageForm: React.FC = () => {

    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<string>("");
    // preview image that we want
    const [preview, setPreview] = useState<string>("");

    const handleChange = (event) => setMessage(event.target.value)

    const onDrop = useCallback ((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            console.log(isDragActive);
            console.log(acceptedFiles)
            setAttachment(file.name);

            // create a preview URL for the dropped file
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL)
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        // accept: ['image/jpeg', 'image/jpg', 'image/png'],
        accept: {'images': ['image/jpeg', 'image/jpg', 'image/png']},
        multiple: false,
        noClick: true,
        onDrop: onDrop
    });

    // const files = acceptedFiles.map((file) => (
    //     <li key={file.name}>
    //         {file.name} - {file.size} bytes
    //     </li>
    // ));

    // const handleDrop = (acceptedFiles: File[]) => {
    //     if (acceptedFiles.length > 0) {
    //         const file = acceptedFiles[0]

    //         setAttachment(file.name);

    //         // create a preview URL for the dropped file
    //         const previewURL = URL.createObjectURL(file);
    //         setPreview(previewURL)
    //     }
    // };

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
                  
                        <div {...getRootProps}>              
                            <input {...getInputProps()}/>
                            {/* {
                                isDragActive ? (
                                <p className="dropzone-content"> Drop the files here ... </p> ):(
                                <p className="dropzone-content">Drag and drop the files here, or click to select files</p>)
                            } */}
                            
                            <PaperClipIcon
                                className="message-form-icon-clip"
                                onClick={open}
                            />
                        </div>
                </div>
            </div>
        </div>
    );
};

export default StandardMessageForm;
