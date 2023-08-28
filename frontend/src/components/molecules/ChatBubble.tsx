import { IChatBubble } from "./ChatBubble.types";

const ChatBubble: React.FC<IChatBubble> = () => {
  return (
    <div className="w-[235px] px-4 pt-4 pb-6 bg-chatapp-gray1 border border-chatapp-gray2 text-left rounded-lg text-sm font-normal mb-6 relative">
      asd qwdasd ad klasjdajdajsdioasiodj jiasoda
      {/*triangle div 1 (bottom triangle / to make the triangle border effect) */}
      <div className="absolute left-[-1px] translate-y-[3px] w-0 h-0 border-t-[21px] border-t-transparent border-l-[21px] border-l-chatapp-gray2 border-b-[21px] border-b-transparent z-10"></div>
      {/*triangle div 2 (top triangle) */}
      <div className="absolute left-[-1px] translate-x-[1px] translate-y-[7px] w-0 h-0 border-t-[18px] border-t-transparent border-l-[18px] border-l-chatapp-gray1 border-b-[18px] border-b-transparent z-20"></div>
      {/*box to overlay div 1 (remove top border)*/}
      <div className="absolute left-0 bg-chatapp-gray1 z-20 w-[50px] h-[20px] translate-y-[4px]"></div>
    </div>
  );
};

export default ChatBubble;
