/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMeQuery } from "@/app/api";
import { setCheckoutId } from "@/app/slices/CheckOutSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { Bakerys, Checkout, Customer, Debts, MessagesIcon, MessagesIcons, Notifications } from "@/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: me } = useMeQuery();

  localStorage.setItem("user", JSON.stringify(me));
  if(me?._id) {
    dispatch(setCheckoutId([me._id,me.balance]));
  }
  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full ">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div
            className="flex gap-x-2 items-center"
            onClick={() => navigate("/profile")}
          >
            <Avatar>
              <AvatarImage
                className="w-10 h-10"
                src="https://github.com/shadcn.png"
                alt="Avatar"
              />
              <AvatarFallback>Sardor</AvatarFallback>
            </Avatar>
            <h2 className="text-white text-xl font-semibold font-inter">
              Guest
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[100px] w-[95%] m-auto p-[12px] overflow-y-auto h-auto mb-20">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/message")}>
            <MessagesIcon className="w-6 h-6 text-[#FFCC15]" />
          </button>
          <button onClick={() => navigate("/messages")}>
            <MessagesIcons className="w-6 h-6 text-[#FFCC15]" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 place-items-center">
          <div
            className="w-36 h-24 bg-white rounded-lg outline outline-2 outline-yellow-400 flex flex-col items-center justify-center space-y-2 shadow"
            onClick={() => navigate("/debts")}
          >
            <div className="w-12 h-12">
              <Debts />
            </div>
            <div className="text-blue-950 text-lg font-extrabold font-['Inter'] leading-tight text-center">
              Qarzdorlar
            </div>
          </div>
          <div
            className="w-36 h-24 bg-white rounded-lg outline outline-2 outline-yellow-400 flex flex-col items-center justify-center space-y-2 shadow"
            onClick={() => navigate("/customer")}
          >
            <div className="w-12 h-12">
              <Customer />
            </div>
            <div className="text-blue-950 text-lg font-extrabold font-['Inter'] leading-tight text-center">
              Mijozlar
            </div>
          </div>
          <div
            className="w-36 h-24 bg-white rounded-lg outline outline-2 outline-yellow-400 flex flex-col items-center justify-center space-y-2 shadow"
            onClick={() => navigate("/bakerys")}
          >
            <div className="w-12 h-12">
              <Bakerys />
            </div>
            <div className="text-blue-950 text-lg font-extrabold font-['Inter'] leading-tight text-center">
              Nonvoyxona
            </div>
          </div>
          <div
            className="w-36 h-24 bg-white rounded-lg outline outline-2 outline-yellow-400 flex flex-col items-center justify-center space-y-2 shadow"
            onClick={() => navigate("/checkout")}
          >
            <div className="w-12 h-12">
              <Checkout />
            </div>
            <div className="text-blue-950 text-lg font-extrabold font-['Inter'] leading-tight text-center">
              Kassa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
