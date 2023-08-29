import { useRef, useState } from "react";
import { IChatInput } from "./ChatInput.types";
import useAutosizeTextArea from "@hooks/useAutoSizeTextarea";

const ChatInput: React.FC<IChatInput> = () => {
  const [value, setValue] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //set textarea height to resize based on value
  useAutosizeTextArea(textAreaRef.current, value);

  //on textarea keydown, if enter key is pressed (without pressing shift key), trigger form submit
  const handleOnKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (formRef.current && e.key === "Enter" && !e.shiftKey) {
      formRef.current.requestSubmit();
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleOnSubmit}
      className="bg-chatapp-gray1 border border-chatapp-gray2 w-full p-4 rounded-4xl flex justify-between items-center"
    >
      <textarea
        ref={textAreaRef}
        rows={1}
        placeholder="Message here..."
        className="w-4/5 bg-transparent placeholder:font-medium placeholder:text-base placeholder:text-chatapp-gray3 outline-none resize-none overflow-hidden"
        required
        onKeyDown={handleOnKeydown}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
      />
      <button
        type="submit"
        className="w-[34px] h-[34px] rounded-full bg-chatapp-green flex justify-center items-center self-end"
      >
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1L6.70711 0.292893C6.31658 -0.0976312 5.68342 -0.0976312 5.29289 0.292893L6 1ZM10.2929 6.70711C10.6834 7.09763 11.3166 7.09763 11.7071 6.70711C12.0976 6.31658 12.0976 5.68342 11.7071 5.29289L10.2929 6.70711ZM0.292893 5.29289C-0.0976312 5.68342 -0.0976312 6.31658 0.292893 6.70711C0.683417 7.09763 1.31658 7.09763 1.70711 6.70711L0.292893 5.29289ZM5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15H5ZM5.29289 1.70711L10.2929 6.70711L11.7071 5.29289L6.70711 0.292893L5.29289 1.70711ZM5.29289 0.292893L0.292893 5.29289L1.70711 6.70711L6.70711 1.70711L5.29289 0.292893ZM5 1V8H7V1H5ZM5 8V15H7V8H5Z"
            fill="white"
          />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
