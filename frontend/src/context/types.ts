export interface IAppState {
  loggedIn: boolean;
  username: string | null;
  roomId: string | null;
}

export type TAction =
  | { type: "SET_LOGGED_IN"; payload: { username: string; roomId: string } }
  | { type: "SET_LOGGED_OUT" };
