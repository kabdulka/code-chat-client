import {useState, ChangeEvent, useEffect} from 'react'
import MessageFormUI from './MessageFormUI';
import { usePostAiAssistMutation } from '../../state/api';

const useDebounce = (value: string, delay: number) => {
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
    const [triggerAiAssist, resultAssist] = usePostAiAssistMutation();
    const [recommendedText, setRecommendedText] = useState<string>("")

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

    // autocomplete
    const handleKeyDown = (event) => {
        // handle enter and tab
        if (event.keyCode === 9 || event.keyCode === 13) {
            event.preventDefault();
            setMessage(`${message} ${recommendedText}`); 
        }
        setRecommendedText("");

        useEffect(() => {
            if (resultAssist.data?.text) {
                setRecommendedText(resultAssist.data?.text);
            }
        }, [resultAssist]); // eslint-disable-line
    }

  return (
    <MessageFormUI 
        setAttachment={setAttachment}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        recommendedText={recommendedText}
        handleKeyDown={handleKeyDown}
    />
  )
}

export default AiAssist

