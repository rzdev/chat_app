import { IMessage } from "../../../types";

export interface IChatPage {
  currentUsername: string
  roomId: string
  messages: IMessage[]
  onSend: (message: string) => void
  onExitClick: () => void
}
