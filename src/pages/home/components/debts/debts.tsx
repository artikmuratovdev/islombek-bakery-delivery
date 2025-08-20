import { Button, Input } from "@/components";
import { Tabs } from "@/components/tabs/tabs";
import { ArrowLeft, Notifications } from "@/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralDebts, TodayDebts } from "./components";

export const Debts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("umumiy qarzlar");
    const tabs = [
        { label: "Umumiy qarzlar", value: "umumiy qarzlar" },
        { label: "Bugungi qarzlar", value: "bugungi qarzlar" },
    ];
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div
                        className="flex gap-x-2 items-center"
                        onClick={() => navigate("/dashboard")}
                    >
                        <Button
                            onClick={() => navigate("/trade")}
                            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
                        >
                            <ArrowLeft className="text-2xl" />
                        </Button>
                    </div>
                    <div>
                        <h2 className="text-white text-xl font-semibold font-inter">
                            Qarzdorlar
                        </h2>
                        <h2 className="text-white text-2xl font-semibold font-inter">
                            8 000 000
                        </h2>
                    </div>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] w-[100%] px-4">
                <Input className="w-full bg-white border border-yellow-400" type="search" />
                <div className="mt-5">
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
                <div className="mt-5">
                    {activeTab === "umumiy qarzlar" && <GeneralDebts />}
                    {activeTab === "bugungi qarzlar" && <TodayDebts />}
                </div>
            </div>
        </div>
    )
};