import React, { useEffect, useContext, useState } from "react";
import { DispatchContext, StateContext } from "@context/index";
import ChatPage from "@components/pages/ChatPage/ChatPage.component";
import { IMessage } from "../../types";
import { socket } from "./../../socket";
import getMessages from "@api/getMessages";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const dispatch = useContext(DispatchContext);
  const { username, roomId } = useContext(StateContext);

  const handleOnExit = () => {
    localStorage.removeItem("jwt_token");
    socket.disconnect();
    dispatch({ type: "SET_LOGGED_OUT" });
  };

  const handleSendMessage = (message: string) => {
    socket.emit("send_message", { username, message, roomId });
  };

  useEffect(() => {
    const onConnect = () => {
      //once connected, join room
      socket.emit("join_room", { username, roomId });
    };

    const onDisconnect = () => {
      console.log("socket.io - disconnected");
    };

    const onIncomingMessageEvent = (newMessage: IMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    };

    const handleBeforeUnload = () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("incoming_message", onIncomingMessageEvent);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("incoming_message", onIncomingMessageEvent);
    window.addEventListener("beforeunload", handleBeforeUnload); // on window or tab close, disconnect from socket.io

    socket.connect();

    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("incoming_message", onIncomingMessageEvent);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [roomId, username]);

  //onload, load messages for current roomId from api
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getMessages();
        if (data && data.data) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();
  }, []);

  if (!username || !roomId) {
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
