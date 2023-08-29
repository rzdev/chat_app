type TChatBubblePosition = "left" | "right";

export interface IChatBubble {
  username?: string;
  message: string;
  position: TChatBubblePosition;
}
