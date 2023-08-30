import { useEffect, useRef } from "react";
import { IChatPage } from "./ChatPage.types";
import Heading from "@components/atoms/Heading/Heading.component";
import ButtonText from "@components/atoms/ButtonText/ButtonText.component";
import ChatBubble from "@components/molecules/ChatBubble/ChatBubble.component";
import Header from "@components/molecules/Header/Header.component";
import ChatInput from "@components/molecules/ChatInput/ChatInput.component";

const ChatPage: React.FC<IChatPage> = ({
  currentUsername,
  messages,
  onSend,
  onExitClick,
  roomId,
}) => {
  const chatSrollerDivRef = useRef<HTMLDivElement | null>(null);

  //everytime there's a new message, scroll to bottom
  useEffect(() => {
    if (chatSrollerDivRef.current) {
      chatSrollerDivRef.current.scrollTop =
        chatSrollerDivRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Header
        leftComponent={<ButtonText onClick={onExitClick}>Exit</ButtonText>}
        middleComponent={<Heading className="truncate ...">{roomId}</Heading>}
      />
      <>
        <div ref={chatSrollerDivRef} className="h-[430px] overflow-x-scroll mb-4">
          {messages.map((item, index) => (
            <ChatBubble
              key={index}
              position={currentUsername === item.username ? "right" : "left"}
              username={item.username}
              message={item.message}
            />
          ))}
        </div>
        <ChatInput onSubmit={onSend} />
      </>
    </>
  );
};

export default ChatPage;
