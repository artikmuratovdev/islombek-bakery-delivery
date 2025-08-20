import { BottomSheet, Button } from "@/components"
import { UZBTime } from "@/components/common/uzb-time";
import { ArrowLeft, Notifications } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { IncomeBottom, Incomes } from "./components";

export const Income = () => {
    const navigate = useNavigate();
    const [openBottomsheet, setOpenBottomsheet] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
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
                    <div>
                        <h2 className="text-white text-xl font-semibold font-inter">
                            Kirim
                        </h2>
                        <h2 className="text-white text-xl font-semibold font-inter">
                            5 000 000
                        </h2>
                    </div>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[27%] w-[100%] flex justify-end px-6">
                <UZBTime />
            </div>
            <div className="px-4 mt-10 space-y-4">
                <div className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6" onClick={() => setOpenBottom(true)}>
                    <h2 className="text-green-700 text-base font-semibold font-['Inter']">1 500 000</h2>
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">20.03.2025 11:30</h2>
                </div>
                <div className="w-full h-9 relative bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6" onClick={() => setOpenBottomsheet(true)}>
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">1 500 000</h2>
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">20.03.2025 11:30</h2>
                </div>
                <div className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6">
                    <h2 className="text-green-700 text-base font-semibold font-['Inter']">10 00 000</h2>
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">20.03.2025 11:30</h2>
                </div>
            </div>
            <BottomSheet open={openBottomsheet} setOpen={setOpenBottomsheet} children={<IncomeBottom onClose={() => setOpenBottomsheet(false)} />} />
            <BottomSheet open={openBottom} setOpen={setOpenBottom} children={<Incomes onClose={() => setOpenBottom(false)} />} />
        </div>
    )
}