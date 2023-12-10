
import { useState } from "react";

import MessageFormUI from "./MessageFormUI";

// import Dropzone from "dropzone";
// import Dropzone from "react-dropzone";

// interface MessageFormProps {
//     // Define the expected props here
//     username: string;
//     onSubmit: (form: Form) => void; // Modify 'any' to the appropriate type
//     // ... other props
// }

// type Form = {
//     attachment: string,
//     created: string,
//     sender_username: string,
//     text: string,
//     activeChatId: string
// }

const StandardMessageForm = ({ props, activeChat }) => {
    // console.log(props);
    // console.log(activeChat);
    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<File>(null);
    // preview image that we want
    // const [preview, setPreview] = useState("");

    const handleChange = (event) => setMessage(event.target.value)

    const handleSubmit = async () => {
        const date = new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        const form = {
          attachments: at,
          created: date,
          sender_username: props.username,
          text: message,
          activeChatId: activeChat.id,
        };
    
        props.onSubmit(form);
        setMessage("");
        setAttachment(null);
    };

    return (

        <MessageFormUI 
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        
    );
};

export default StandardMessageForm;
