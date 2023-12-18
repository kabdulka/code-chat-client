import React, {useState, ChangeEvent} from 'react'
import MessageFormUI from './MessageFormUI';
import { usePostAiTextMutation } from '../../state/api';

const Ai = ({ props, activeChat }) => {

    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<File>(null);
    const [postAiText] = usePostAiTextMutation();

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
        console.log(postAiText)
        props.onSubmit(form);
        postAiText(form);
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
  )
}

export default Ai

