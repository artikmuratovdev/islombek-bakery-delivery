import { Button } from "@/components";
import { ArrowLeft, Plus } from "@/icons";
import { useNavigate } from "react-router-dom";
import { Arrived, Sent, SentMessage } from "./components";
import { useState } from "react";
import { BottomSheet } from "@/components/common";

export const Message = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔹 Mock foydalanuvchi
  const user = { _id: "123", fullName: "Men (User)" };

  // 🔹 Mock shikoyatlar
  const complaints = [
    {
      _id: "1",
      from: { _id: "123", fullName: "Men (User)" },
      to: { _id: "456", fullName: "Dilnoza Karimova" },
      content: "Savolimga javob bermayapti.",
    },
    {
      _id: "2",
      from: { _id: "789", fullName: "Sherzod Qodirov" },
      to: { _id: "123", fullName: "Men (User)" },
      content: "Iltimos, hujjatlarni vaqtida topshiring.",
    },
    {
      _id: "3",
      from: { _id: "123", fullName: "Men (User)" },
      to: { _id: "101", fullName: "Ali Valiyev" },
      content: "Buxgalteriya ma’lumotlari noto‘g‘ri chiqdi.",
    },
  ];

  return (
    <div>
      {/* 🔹 Header */}
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto gap-x-[66px] items-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
            Shikoyatlar
          </h3>
        </div>
      </div>

      {/* 🔹 Complaints list */}
      <div className="mt-[65px] p-5">
        <Arrived
          complaintd={complaints.filter((item) => item.to?._id === user._id)}
        />
        <Sent data={complaints.filter((item) => item.from?._id === user._id)} />
      </div>

      {/* 🔹 Add complaint button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-[44px] right-5 h-10 p-3 bg-[#ffcb15] rounded-[20px] shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
      >
        <Plus />
      </Button>

      {/* 🔹 BottomSheet */}
      <BottomSheet
        children={<SentMessage setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
