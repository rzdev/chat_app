import { IHeading } from "./Heading.types";

const Heading: React.FC<IHeading> = ({ className, children }) => {
  return <h1 className={`text-3xl font-semibold ${ className ? className : '' }`}>{children}</h1>;
};

export default Heading;
