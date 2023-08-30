import { useContext, useEffect, useRef, useState } from "react";
import { DispatchContext, StateContext } from "@context/index";
import LoginPage from "@components/pages/LoginPage/LoginPage.component";
import login from "@api/login";
import { JWT_TOKEN_STORAGE_KEY } from "@utils/constants";

const Login: React.FC = () => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const roomIdInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const dispatch = useContext(DispatchContext);
  const { usernameError } = useContext(StateContext);

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

    //reset username error
    dispatch({
      type: "SET_USERNAME_ERROR",
      payload: { error: null },
    });

    //validate username to disallow spaces
    if (usernameInputRef.current && username.includes(" ")) {
      usernameInputRef.current.setCustomValidity(
        "Username cannot contain spaces."
      );
      usernameInputRef.current.reportValidity();
      return;
    }

    //validate roomId to disallow spaces
    if (roomIdInputRef.current && roomId.includes(" ")) {
      roomIdInputRef.current.setCustomValidity("RoomID cannot contain spaces.");
      roomIdInputRef.current.reportValidity();
      return;
    }

    /*
     * request access token to backend api
     * and log in current user
     */
    try {
      const data = await login(username, roomId);
      
      if (data?.jwt_token) {
        //store jwt token in localstorage, so that if the user do a browser refresh, it will still keep the session
        localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.jwt_token);
        dispatch({ type: "SET_LOGGED_IN", payload: { username, roomId } });
      } else if (data?.error) {
        dispatch({
          type: "SET_USERNAME_ERROR",
          payload: { error: data.error },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //if server returns an error when trying to login, show error
  useEffect(() => {
    if (usernameError) {
      let message = "Something went wrong, please try again..";

      if (usernameError === "username_exists") {
        message = "Sorry, Username is already taken.";
      }

      setErrorMessage(message);
    } else {
      setErrorMessage(null);
    }
  }, [usernameError]);

  return (
    <LoginPage
      usernameInputRef={usernameInputRef}
      roomIdInputRef={roomIdInputRef}
      username={username}
      roomId={roomId}
      errorMessage={errorMessage}
      onUsernameChange={handleUsernameChange}
      onRoomIdChange={handleRoomIdChange}
      onSubmit={handleLoginSubmit}
    />
  );
};

export default Login;
