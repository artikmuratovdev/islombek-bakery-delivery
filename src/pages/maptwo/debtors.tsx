import { BottomSheet, Button, LeafletMap } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";
import { PaymentDrawer } from "./components";
import { useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

export const Debtors = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // static debtor ma’lumotlari
  const debtor = {
    createdAt: "2025-08-20T10:15:00Z",
    cost: 8500,
    amount: 25,
    customer: { fullName: "Jasur Karimov" },
    location: "Toshkent, Chilonzor",
  };

  const branch = {
    breadPrice: 8000,
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        {/* Header */}
        <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
          <div className="flex w-[95%] m-auto justify-between items-center">
            <Button
              onClick={() => navigate("/orders")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
            >
              <ArrowLeft className="text-2xl hover:bg-[#FFCC15] hover:text-[#FFCC15]" />
            </Button>
            <h3 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
              Zakaslar
            </h3>
            <button onClick={() => navigate("/notifications")}>
              <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mt-[76px]">
          <LeafletMap
            setLocation={(v) => {
              console.log("location sent:", v);
            }}
          />
        </div>

        {/* Info section */}
        <div className="p-5">
          <div className="grid grid-cols-2 gap-y-[14px] gap-x-5">
            <div className="py-1.5 flex justify-center items-center font-inter text-[#1b2b56] bg-white rounded border border-[#ffcb15] font-bold text-[15px]">
              {formatTime(debtor?.createdAt ?? "")}
            </div>
            <div className="py-1.5 flex justify-center items-center font-inter text-[#1b2b56] bg-white rounded border border-[#ffcb15] font-bold text-[15px]">
              {debtor?.cost || branch?.breadPrice}
            </div>
            <div className="py-1.5 flex justify-center items-center font-inter text-[#1b2b56] bg-white rounded border border-[#ffcb15] font-bold text-[15px]">
              {debtor?.amount}
            </div>
            <div className="py-1.5 flex justify-center items-center font-inter text-[#1b2b56] bg-white rounded border border-[#ffcb15] font-bold text-[15px]">
              {debtor?.customer?.fullName || debtor?.location}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="w-2/5 bg-[#FFCC15] text-[#1C2C57] hover:text-white font-semibold mt-[20px] ml-[200px]"
            >
              To'lovni kiritish
            </Button>
          </div>
        </div>

        {/* Bottom sheet */}
        <BottomSheet
          children={<PaymentDrawer setOpen={setOpen} />}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </PullToRefresh>
  );
};
