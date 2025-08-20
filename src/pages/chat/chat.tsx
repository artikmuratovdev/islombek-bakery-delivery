/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
} from "@/components";
import { ArrowLeft } from "@/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";

export const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Fake user (API o‘rniga static)
  const [user] = useState({
    _id: id,
    fullName: "Sardor Web",
    avatar: "https://via.placeholder.com/100",
  });

  // ✅ Fake xabarlar (API o‘rniga static)
  const [messages, setMessages] = useState([
    {
      from: id,
      to: "me",
      content: "Salom, qalaysan?",
      createdAt: new Date().toISOString(),
    },
    {
      from: "me",
      to: id,
      content: "Yaxshi, rahmat. O‘zingchi?",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dates: { [x: string]: true | undefined } = {};
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ✅ Xabar yuborish (faqat local state’ga qo‘shiladi)
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "me",
          to: id,
          content: message,
          createdAt: new Date().toISOString(),
        },
      ]);
      setMessage("");
      setIsLoading(false);
    }, 500); // fake loading
  };

  return (
    <div className="">
      {/* Header */}
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div className="flex gap-x-[30px] items-center">
            <button
              onClick={() => navigate("/messages")}
              className="text-white hover:text-[#FFCC15]"
            >
              <ArrowLeft />
            </button>
            <Avatar>
              <AvatarImage
                className="w-10 h-10 object-cover"
                src={user.avatar}
                alt="Avatar"
              />
              <AvatarFallback>{user.fullName[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-white text-xl font-semibold font-inter">
              {user.fullName}
            </h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="pb-20 pt-16 px-4 flex flex-col gap-4 mt-[29px]">
        {messages.map((msg, index) => (
          <>
            {!dates[msg.createdAt.slice(0, 10)] &&
              ((dates[msg.createdAt.slice(0, 10)] = true),
              (
                <div
                  key={`date-${index}`}
                  className="text-center text-white text-sm text-[12px] font-semibold my-2"
                >
                  {msg.createdAt.slice(0, 10)}
                </div>
              ))}

            <div
              key={index}
              className={`w-[70%] p-3 rounded-t-[10px] mt-[10px] ${
                msg.from === id
                  ? "rounded-br-[10px] bg-white text-[#1C2C57]"
                  : "ml-auto rounded-bl-[10px] bg-[#9191ED] text-white"
              }`}
            >
              <p className="text-[15px] font-[400]">{msg.content}</p>
              <p className="text-[12px] font-[400] text-end">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="w-full bg-[#16181f] fixed bottom-0 py-[7px] px-3 ">
        <div className="flex gap-x-[11px]">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="rounded-[21px] border border-white pl-[33px] text-white"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="w-[31px] h-[31px] bg-[#517aff] rounded-full"
          >
            {isLoading ? (
              <RiLoader2Fill className="text-white animate-spin text-2xl" />
            ) : (
              <ArrowLeft className="rotate-90" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
