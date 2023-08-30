import { useContext, useRef, useState } from "react";
import { DispatchContext } from "@context/index";
import LoginPage from "@components/pages/LoginPage/LoginPage.component";
import login from "@api/login";

const Login: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const roomIdInputRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const dispatch = useContext(DispatchContext);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (usernameInputRef.current) {
      //reset username validation
      usernameInputRef.current.setCustomValidity("");
    }

    setUsername(e.target.value);
  };

  const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (roomIdInputRef.current) {
      //reset roomId validation
      roomIdInputRef.current.setCustomValidity("");
    }

    setRoomId(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validate username to disallow spaces
    if (formRef.current && usernameInputRef.current && username.includes(" ")) {
      usernameInputRef.current.setCustomValidity(
        "Username cannot contain spaces"
      );
      formRef.current.reportValidity();
      return;
    }

    //validate roomId to disallow spaces
    if (formRef.current && roomIdInputRef.current && roomId.includes(" ")) {
      roomIdInputRef.current.setCustomValidity("RoomID cannot contain spaces");
      formRef.current.reportValidity();
      return;
    }

    /*
     * request access token to backend api
     * and log in current user
     */
    login(username, roomId, () => {
      dispatch({ type: "SET_LOGGED_IN", payload: { username, roomId } });
    });
  };

  return (
    <LoginPage
      ref={formRef}
      usernameInputRef={usernameInputRef}
      roomIdInputRef={roomIdInputRef}
      username={username}
      roomId={roomId}
      onUsernameChange={handleUsernameChange}
      onRoomIdChange={handleRoomIdChange}
      onSubmit={handleLoginSubmit}
    />
  );
};

export default Login;
