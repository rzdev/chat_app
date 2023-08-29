import { IHeader } from "./Header.types";

const Header: React.FC<IHeader> = ({
  leftComponent = null,
  middleComponent = null,
  rightComponent = null,
}) => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="w-1/5 text-left">{leftComponent}</div>
      <div className="w-4/5 text-center">{middleComponent}</div>
      <div className="w-1/5 text-right">{rightComponent}</div>
    </div>
  );
};

export default Header;
