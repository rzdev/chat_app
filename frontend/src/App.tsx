import Heading from "@components/atoms/Heading/Heading";
import InputText from "@components/atoms/InputText/InputText";
import Button from "@components/atoms/Button/Button";

const App = () => {
  return (
    <div className="w-[377px] text-center my-0 mx-auto bg-white shadow-inner px-4 pt-4 pb-[59px] mt-4">
      <Heading className="mb-8">Join Chatroom</Heading>
      <InputText placeholder="Username" className="mb-4" required />
      <InputText placeholder="RoomID" required className="mb-[167px]"/>
      <Button>JOIN</Button>
    </div>
  );
};

export default App;
