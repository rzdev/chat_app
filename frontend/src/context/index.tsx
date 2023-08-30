import { createContext, useReducer } from "react";
import { IAppState, TAction } from "./types";

const initialState: IAppState = {
  usernameError: null,
  loggedIn: false,
  username: null,
  roomId: null,
};

const reducer = (state: IAppState, action: TAction): IAppState => {
  switch (action.type) {
    case "SET_USERNAME_ERROR":
      return {
        ...state,
        usernameError: action.payload.error,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        roomId: action.payload.roomId,
        usernameError: null,
      };
    case "SET_LOGGED_OUT":
      return initialState;
  }
};

const StateContext = createContext(initialState);
const DispatchContext = createContext<(action: TAction) => void>(() => {});

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispath] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispath}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { StateContext, DispatchContext, ContextProvider };
