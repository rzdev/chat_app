import { IChatBubble } from "./ChatBubble.types";

const ChatBubble: React.FC<IChatBubble> = ({
  username = null,
  message,
  position,
}) => {
  return (
    <div className={`mb-6 flex items-center ${position === 'left' ? 'justify-start' : 'justify-end' }`}>
      {position === "left" ? (
        <div className="flex flex-col">
          <span className="text-sm font-normal">{username}</span>
          <div className="w-[235px] px-4 pt-4 pb-6 bg-chatapp-gray1 border border-chatapp-gray2 text-left rounded-lg text-sm font-normal relative">
            {message}
            {/*triangle div 1 (left bottom triangle / to make the triangle border effect) */}
            <div className="absolute left-[-1px] translate-y-[3px] w-0 h-0 border-t-[21px] border-t-transparent border-l-[21px] border-l-chatapp-gray2 border-b-[21px] border-b-transparent z-10"></div>
            {/*triangle div 2 (left top triangle) */}
            <div className="absolute left-[-1px] translate-x-[1px] translate-y-[7px] w-0 h-0 border-t-[18px] border-t-transparent border-l-[18px] border-l-chatapp-gray1 border-b-[18px] border-b-transparent z-20"></div>
            {/*box to overlay div 1 (remove top left border)*/}
            <div className="absolute left-0 bg-chatapp-gray1 z-20 w-[50px] h-[20px] translate-y-[4px]"></div>
          </div>
        </div>
      ) : (
        <div className="w-[235px] px-4 pt-4 pb-6 bg-chatapp-green text-right rounded-lg text-sm font-normal relative text-white">
          {message}
          {/*triangle div (right bottom triangle */}
          <div className="absolute right-0 translate-y-[3px] w-0 h-0 border-t-[21px] border-t-transparent border-r-[21px] border-r-chatapp-green border-b-[21px] border-b-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
