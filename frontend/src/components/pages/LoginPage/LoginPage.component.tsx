import Heading from "@components/atoms/Heading/Heading.component";
import InputText from "@components/atoms/InputText/InputText.component";
import Button from "@components/atoms/Button/Button.component";
import Header from "@components/molecules/Header/Header.component";
import { ILoginPage } from "./LoginPage.types";

const LoginPage: React.FC<ILoginPage> = ({
  usernameInputRef,
  roomIdInputRef,
  username,
  roomId,
  errorMessage,
  onUsernameChange,
  onRoomIdChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Header middleComponent={<Heading>Join Chatroom</Heading>} />
      <InputText
        {...(usernameInputRef && { ref: usernameInputRef })}
        value={username}
        onChange={onUsernameChange}
        placeholder="Username"
        className="mb-4"
        required
      />
      <InputText
        {...(usernameInputRef && { ref: roomIdInputRef })}
        value={roomId}
        onChange={onRoomIdChange}
        placeholder="RoomID"
        className="mb-[167px]"
        required
      />
      <Button type="submit">JOIN</Button>
      {errorMessage && (
        <span className="inline-block text-red-500 mt-4 w-full text-center">
          {errorMessage}
        </span>
      )}
    </form>
  );
};

export default LoginPage;
