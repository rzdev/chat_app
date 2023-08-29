import { IButton } from "./Button.types";

const Button: React.FC<IButton> = ({ className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-chatapp-green w-full p-4 rounded-full font-semibold text-white ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
