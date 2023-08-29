import { IButtonText } from "./ButtonText.types";

const ButtonText: React.FC<IButtonText> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-none text-base font-medium text-chatapp-green ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonText;
