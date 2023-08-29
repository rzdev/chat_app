export interface ILoginPage {
  ref?: React.ForwardedRef<HTMLFormElement>;
  usernameInputRef?: React.RefObject<HTMLInputElement>;
  roomIdInputRef?: React.RefObject<HTMLInputElement>;
  username: string;
  roomId: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoomIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
