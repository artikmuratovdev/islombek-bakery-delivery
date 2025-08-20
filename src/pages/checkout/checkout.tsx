import { Button } from "@/components"
import { Tabs } from "@/components/tabs/tabs";
import { ArrowLeft, Notifications } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ForoWrk } from "./components";

export const Checkout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("ish uchun");
    const tabs = [
        { label: "Ish uchun", value: "ish uchun" },
        { label: "Ish haqi", value: "ish haqi" },
    ];
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h3 className="text-white text-2xl font-semibold">
                        Kassa
                    </h3>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] px-4">
                <div className="w-full h-10 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 flex justify-between items-center px-6">
                    <h3 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none">Balance</h3>
                    <h3 className="text-green-700 text-base font-semibold font-['Inter'] leading-none">1 000 000</h3>
                </div>
                <div className="mt-10">
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                    {activeTab === "ish uchun" && <ForoWrk />}
                    {activeTab === "ish haqi" && <><h3 className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none text-center">Hozircha hech narsa yo'q</h3></>}
                </div>
            </div>
        </div>
    )
}