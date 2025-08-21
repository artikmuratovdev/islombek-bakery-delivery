import { Button } from "@/components";
import { Tabs } from "@/components/tabs/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Notifications } from "@/icons";
import { ActiveOrder, OldOrder } from "./components";

export const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activeOrder");

  // const formatTime = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleTimeString("en-GB", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   });
  // };

  const tabs = [
    { label: 'Faol zakazlar', value: 'activeOrder' },
    { label: 'Oldingi zakazlar', value: 'preOrder' },
  ];

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
          <div className="flex w-[95%] m-auto justify-between items-center">
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
            <h3 className="text-white text-2xl font-semibold">
              Zakazlar
            </h3>
            <button onClick={() => navigate("/notifications")}>
              <Notifications className="text-[#FFCC15] w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="mt-[95px] p-5">
          <Tabs tabs={tabs}  activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "activeOrder" && <ActiveOrder />}
          {activeTab === "preOrder" && <OldOrder />}
        </div>
      </div>
    </div>
  );
};
