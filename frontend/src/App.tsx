import { useState } from "react";
import Heading from "@components/atoms/Heading/Heading.component";
import InputText from "@components/atoms/InputText/InputText.component";
import Button from "@components/atoms/Button/Button.component";
import ButtonText from "@components/atoms/ButtonText/ButtonText.component";
import ChatBubble from "@components/molecules/ChatBubble/ChatBubble.component";
import Header from "@components/molecules/Header/Header.component";
import ChatInput from "@components/molecules/ChatInput/ChatInput.component";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roomId] = useState("kambing123");

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="w-[377px] min-h-[600px] my-0 mx-auto bg-white shadow-inner px-4 pt-4 pb-[59px] mt-4">
      {!loggedIn ? (
        <form onSubmit={handleLoginSubmit}>
          <Header middleComponent={<Heading>Join Chatroom</Heading>} />
          <InputText placeholder="Username" className="mb-4" required />
          <InputText placeholder="RoomID" className="mb-[167px]" required />
          <Button type="submit">JOIN</Button>
        </form>
      ) : (
        <>
          <Header
            leftComponent={
              <ButtonText onClick={() => setLoggedIn(false)}>Exit</ButtonText>
            }
            middleComponent={
              <Heading className="truncate ...">{roomId}</Heading>
            }
          />
          <ChatBubble position="left" username="kambing1" message="halo halo bandung" />
          <ChatBubble position="left" username="kambing1" message="mantap" />
          <ChatBubble position="right" message="kambing" />
          <ChatBubble position="left" username="kambing1" message="mantap" />
          <ChatInput />
        </>
      )}
    </div>
  );
};

export default App;
