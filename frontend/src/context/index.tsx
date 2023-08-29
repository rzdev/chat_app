import { createContext, useReducer } from "react";
import { IAppState, TAction } from "./types";

const initialState: IAppState = {
  loggedIn: false,
  username: null,
  roomId: null,
};

const reducer = (state: IAppState, action: TAction): IAppState => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        roomId: action.payload.roomId,
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
