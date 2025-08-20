import { Button } from "@/components"
import { ArrowLeft, MessagesIcon, MessagesIcons, Notifications } from "@/icons"
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Drivers = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const doughItems = [
        { name: "Chig'atoy", count: 500 },
        { name: "Buxonka", count: 200 },
    ];
    const totalCount = 850;
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div
                        className="flex gap-x-2 items-center"
                        onClick={() => navigate("/balance")}
                    >
                        <Button
                            onClick={() => navigate("/balance")}
                            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
                        >
                            <ArrowLeft className="text-2xl" />
                        </Button>
                    </div>
                    <h2 className="text-white text-xl font-semibold font-inter">
                        Haydovchilar
                    </h2>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] w-[95%] m-auto p-[12px] overflow-y-auto h-auto mb-20 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate("/message")}>
                        <MessagesIcon className="w-6 h-6 text-[#FFCC15]" />
                    </button>
                    <button onClick={() => navigate("/messages")}>
                        <MessagesIcons className="w-6 h-6 text-[#FFCC15]" />
                    </button>
                </div>
                <div
                    onClick={() => setOpen(!open)}
                    className="w-full h-12 bg-white border-2 border-[#FFCC15] rounded-lg flex justify-between items-center px-4 cursor-pointer"
                >
                    <h2 className="text-blue-950 text-xl font-extrabold">Izzat</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-blue-950 text-xl font-bold">{totalCount}</span>
                        {open ? (
                            <ChevronUp className="text-blue-950" />
                        ) : (
                            <ChevronDown className="text-blue-950" />
                        )}
                    </div>
                </div>
                {open && (
                    <div className=" space-y-2">
                        {doughItems.map((item, index) => (
                            <div
                                key={index}
                                className="w-full bg-white border-2 border-[#FFCC15] rounded-lg px-4 py-2 flex justify-between items-center"
                            >
                                <span className="text-blue-950 font-semibold">{item.name}</span>
                                <span className="text-blue-950 font-bold">{item.count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}