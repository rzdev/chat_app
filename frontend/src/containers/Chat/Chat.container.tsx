import React, { useEffect, useContext, useState } from "react";
import { DispatchContext, StateContext } from "@context/index";
import ChatPage from "@components/pages/ChatPage/ChatPage.component";
import { IMessage } from "../../types";
import { socket } from "./../../socket";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const dispatch = useContext(DispatchContext);
  const { username, roomId } = useContext(StateContext);

  const handleOnExit = () => {
    if (window.localStorage) {
      window.localStorage.removeItem("jwt_token");
    }
    dispatch({ type: "SET_LOGGED_OUT" });
  };

  const handleSendMessage = (message: string) => {
    socket.emit("send_message", { username, message, roomId });
  };

  useEffect(() => {
    function onConnect() {
      console.log("socket.io - connected");

      //once connected, join room
      socket.emit("join_room", { roomId });
    }

    function onDisconnect() {
      console.log("socket.io - disconnected");
    }

    function onIncomingMessageEvent(newMessage: IMessage) {
      setMessages((messages) => [...messages, newMessage]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("incoming_message", onIncomingMessageEvent);

    socket.connect();

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("incoming_message", onIncomingMessageEvent);
    };
  }, [roomId]);

  if(!username || !roomId) {
    return null;
  }

  return (
    <ChatPage
      currentUsername={username}
      roomId={roomId}
      messages={messages}
      onSend={handleSendMessage}
      onExitClick={handleOnExit}
    />
  );
};

export default Chat;
