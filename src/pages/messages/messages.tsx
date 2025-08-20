import { Avatar, AvatarFallback, AvatarImage } from "@/components";

export const Messages = () => {
  // Statik chatlar
  const MESSAGES_DATA = [
    {
      chat: {
        _id: "1",
        fullName: "Ali Valiyev",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      lastMessage: "Salom! Qalaysan?",
    },
    {
      chat: {
        _id: "2",
        fullName: "Dilnoza Karimova",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      lastMessage: "Bugun uchrashamizmi?",
    },
    {
      chat: {
        _id: "3",
        fullName: "Jasur Tursunov",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      lastMessage: "Kitobni olib keldingmi?",
    },
  ];

  return (
    <div className="mt-[20px] p-5 overflow-y-auto">
      <div className="flex flex-col gap-y-[27px]">
        {MESSAGES_DATA.map((item) => (
          <div key={item.chat._id} className="bg-white rounded-lg p-1">
            <div className="flex gap-x-[10px] items-center">
              <Avatar className="rounded-lg">
                <AvatarImage
                  src={item.chat.avatar}
                  className="w-10 h-10 object-cover"
                  alt="Avatar"
                />
                <AvatarFallback>{item.chat.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-y-1 items-start">
                <h4 className="text-center text-[#1b2b56] text-sm font-black font-inter leading-[18.20px]">
                  {item.chat.fullName}
                </h4>
                <h5 className="text-center text-[#1b2b56] text-xs font-semibold font-['Inter'] leading-none">
                  {item.lastMessage}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
