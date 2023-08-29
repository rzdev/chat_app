import { forwardRef } from "react";
import Heading from "@components/atoms/Heading/Heading.component";
import InputText from "@components/atoms/InputText/InputText.component";
import Button from "@components/atoms/Button/Button.component";
import Header from "@components/molecules/Header/Header.component";
import { ILoginPage } from "./LoginPage.types";

const LoginPage: React.FC<ILoginPage> = forwardRef<
  HTMLFormElement,
  ILoginPage
>(
  (
    {
      usernameInputRef,
      roomIdInputRef,
      username,
      roomId,
      onUsernameChange,
      onRoomIdChange,
      onSubmit,
    },
    ref
  ) => {
    return (
      <form ref={ref} onSubmit={onSubmit}>
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
      </form>
    );
  }
);
export default LoginPage;
