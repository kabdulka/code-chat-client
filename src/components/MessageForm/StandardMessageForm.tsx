
import { ChangeEvent, useState } from "react";
import MessageFormUI from "./MessageFormUI";

const StandardMessageForm = ({ props, activeChat }) => {
    // console.log(props);
    // console.log(activeChat);
    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<File>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMessage(event.target.value)

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
