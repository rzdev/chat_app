import { useState } from "react";
import Heading from "@components/atoms/Heading/Heading";
import InputText from "@components/atoms/InputText/InputText";
import Button from "@components/atoms/Button/Button";
import ChatBubble from "@components/molecules/ChatBubble";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="w-[377px] text-center my-0 mx-auto bg-white shadow-inner px-4 pt-4 pb-[59px] mt-4">
      {!loggedIn ? (
        <form>
          <Heading className="mb-8">Join Chatroom</Heading>
          <InputText placeholder="Username" className="mb-4" required />
          <InputText placeholder="RoomID" className="mb-[167px]" required />
          <Button>JOIN</Button>
        </form>
      ) : (
        <form>
          <ChatBubble />
          <ChatBubble />
        </form>
      )}
    </div>
  );
};

export default App;
