import { Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";

export const TradeDetails = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div
                        className="flex gap-x-2 items-center"
                        onClick={() => navigate("/trade")}
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
                            Begoyim
                        </h2>
                        <h2 className="text-white text-2xl font-semibold font-inter">
                            99 456 12 37
                        </h2>
                    </div>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] px-4 space-y-3">
                <div className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex justify-between items-center px-4">
                    <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Chig'atoy</h2>
                    <h2 className="text-blue-950 text-sm font-bold font-['Inter']">5 000</h2>
                    <h2 className="text-blue-950 text-sm font-bold font-['Inter']">0</h2>
                </div>
                <div className="w-full h-9 relative bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex justify-between items-center px-4">
                    <h2 className="text-blue-950 text-sm font-bold">Patir</h2>
                    <h2 className="text-blue-950 text-sm font-bold">5 000</h2>
                    <h2 className="text-blue-950 text-sm font-bold">1000</h2>
                </div>
                <h1 className="text-white text-[22px] font-semibold leading-none">Umumiy summa: 5 200 000</h1>
                <h2 className="text-yellow-400 text-2xl font-semibold font-['Inter'] leading-none">11.04.2023 12:23</h2>
                <div className="w-full h-28 relative rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 px-2 py-3">
                    <h3 className="text-yellow-400 text-lg font-semibold font-['Inter'] leading-none">Doimiy mijozimiz.</h3>
                </div>
            </div>
        </div>
    )
};