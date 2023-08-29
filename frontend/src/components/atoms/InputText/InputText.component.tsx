import { forwardRef } from "react";
import { IInputText } from "./InputText.types";

const InputText: React.FC<IInputText> = forwardRef<
  HTMLInputElement,
  IInputText
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={`bg-chatapp-gray1 border border-chatapp-gray2 outline-none w-full placeholder:font-medium placeholder:text-base placeholder:text-chatapp-gray3 p-4 rounded-lg ${
        className ? className : ""
      }`}
    />
  );
});

export default InputText;
