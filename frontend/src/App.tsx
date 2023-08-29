import { useEffect, useContext } from "react";
import Chat from "@containers/Chat/Chat.container";
import Login from "@containers/Login/Login.container";
import { DispatchContext, StateContext } from "./context";
import getAuthData from "@api/auth";

const App = () => {
  const { loggedIn } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  //try to authenticate using data from jwt token (if token exists)
  useEffect(() => {
    getAuthData((data) => {
      dispatch({
        type: "SET_LOGGED_IN",
        payload: { username: data.username, roomId: data.roomId },
      });
    });
  }, [dispatch]);

  return (
    <div className="w-[377px] min-h-[600px] my-0 mx-auto bg-white shadow-inner px-4 pt-4 mt-4">
      {!loggedIn ? <Login /> : <Chat />}
    </div>
  );
};

export default App;
