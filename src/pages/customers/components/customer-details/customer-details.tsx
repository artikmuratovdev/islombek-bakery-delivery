import { Button } from "@/components"
import { ArrowLeft, Clock, Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"

export const CustomerDetails = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div
                        className="flex gap-x-2 items-center"
                        onClick={() => navigate("/customer")}
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
                            99 567 87 45
                        </h2>
                    </div>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[35%] px-3">
                <div className="space-y-5">
                    <div className="w-full h-32 bg-white rounded-lg border border-yellow-400">
                        <div className="flex justify-between items-center px-3 mt-1">
                            <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">Izzat</h3>
                            <h2 className="text-red-700 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">10:45</h2>
                            <h2 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center"><Clock />  06:00</h2>
                            <h2 className="text-green-700 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">10:51</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Chig'atoy</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">0</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Patir</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">1000</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Buxonka</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">100</h2>
                        </div>
                    </div>
                    <div className="w-full h-32 bg-white rounded-lg border border-yellow-400">
                        <div className="flex justify-between items-center px-3 mt-1">
                            <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">Izzat</h3>
                            <h2 className="text-red-700 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">10:45</h2>
                            <h2 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center"><Clock />  06:00</h2>
                            <h2 className="text-green-700 text-base font-semibold font-['Inter'] leading-none w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">10:51</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Chig'atoy</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">0</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Patir</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">1000</h2>
                        </div>
                        <div className="flex justify-between items-center px-3 mt-2">
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">Buxonka</h2>
                            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">100</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}