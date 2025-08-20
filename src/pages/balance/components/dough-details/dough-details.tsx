import { useState } from "react";
import { Button } from "@/components";
import { ArrowLeft, Notifications, Plus } from "@/icons";
import { useNavigate } from "react-router-dom";

export const DoughDetails = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);

    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                        <Button
                            onClick={() => navigate("/balance")}
                            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
                        >
                            <ArrowLeft className="text-2xl" />
                        </Button>
                    </div>
                    <h2 className="text-white text-xl font-semibold font-inter">Bochkadan</h2>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="px-3 space-y-4">
                <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden mt-[100px] flex items-center px-4 justify-between">
                    <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
                    <p className="text-blue-950 text-sm font-bold">3</p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDecrement}
                            className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                        >
                            -
                        </button>
                        <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
                        <button
                            onClick={handleIncrement}
                            className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between">
                    <div className="text-blue-950 text-sm font-bold">Patir</div>
                    <p className="text-blue-950 text-sm font-bold">2</p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDecrement}
                            className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                        >
                            -
                        </button>
                        <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
                        <button
                            onClick={handleIncrement}
                            className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="w-36 h-7 p-3 bg-stone-300 rounded-lg  inline-flex justify-center items-center gap-1 text-[#1B2B56] hover:bg-stone-300">Davom etish</Button>
                </div>
            </div>
        </div>
    );
};
