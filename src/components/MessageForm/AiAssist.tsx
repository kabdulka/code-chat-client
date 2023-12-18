import {useState, ChangeEvent, useEffect} from 'react'
import MessageFormUI from './MessageFormUI';
import { usePostAiAssistMutation } from '../../state/api';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay )

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay]);

    return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {

    const [message, setMessage] = useState<string>("");
    const [attachment, setAttachment] = useState<File>(null);
    const [triggerAiAssist] = usePostAiAssistMutation();

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
        console.log(triggerAiAssist)
        props.onSubmit(form);
    
        setMessage("");
        setAttachment(null);
    };

    // send msg every 1000
    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        // make api call when debounced value is there
        if (debouncedValue) {
            const form = { text: message };
            triggerAiAssist(form)
        }
    }, [debouncedValue]); // eslint-disable-line

  return (
    <MessageFormUI 
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
  )
}

export default AiAssist

