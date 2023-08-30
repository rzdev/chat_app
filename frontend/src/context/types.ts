export interface IAppState {
  usernameError: string | null;
  loggedIn: boolean;
  username: string | null;
  roomId: string | null;
}

export type TAction =
  | { type: "SET_USERNAME_ERROR"; payload: { error: string | null } }
  | { type: "SET_LOGGED_IN"; payload: { username: string; roomId: string } }
  | { type: "SET_LOGGED_OUT" };
