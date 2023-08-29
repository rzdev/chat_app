import { IInputText } from "./InputText.types";

const InputText: React.FC<IInputText> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`bg-chatapp-gray1 border border-chatapp-gray2 outline-none w-full placeholder:font-medium placeholder:text-base placeholder:text-chatapp-gray3 p-4 ${
        className ? className : "rounded-lg"
      }`}
    />
  );
};

export default InputText;
