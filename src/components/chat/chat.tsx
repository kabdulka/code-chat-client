import React from "react"
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from "react-chat-engine-advanced"
import Header from "../header/header";
import MessageForm from "../MessageForm/MessageForm";

const Chat = () => {
    console.log(import.meta.env.BASE_URL);
    // chat authentication needed to connect to chatengine project
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        "kenan",
        "1234", 
    );

    console.log(chatProps);
 
    return (

        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket  {...chatProps}/>
            <MultiChatWindow 
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <Header chat={chat}/>}
                renderMessageForm={(props) => {
                    return (
                        <MessageForm props={props} activeChat={chatProps.chat} />
                    )
                }}
            />
        </div>

    )
}

export default Chat