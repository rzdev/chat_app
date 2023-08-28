const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  className,
  children,
}) => {
  return (
    <button className={`bg-chatapp-green w-full p-4 rounded-full font-semibold text-white ${className ? className : ""}`}>
      {children}
    </button>
  );
};

export default Button;
