import { Button } from "@/components"
import { ArrowLeft, Notifications, Plus } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const BakeryDispatcher = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);


    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    }
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <Button
                        onClick={() => navigate("/bakery/bakery-details")}
                        className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h3 className="text-white text-2xl font-semibold">
                        Jo'raboyeva
                    </h3>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] px-6">
                <div className="space-y-3">
                    <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between mt-8">
                        <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
                        <p className="text-blue-950 text-sm font-bold flex gap-x-1">3</p>
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
                        <p className="text-blue-950 text-sm font-bold flex gap-x-1">2</p>
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
                        <p className="text-blue-950 text-sm font-bold flex gap-x-1">1</p>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleDecrement}
                                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                            >
                                -
                            </button>
                            <span className="text-red-700 text-sm font-bold w-6 text-center">3</span>
                            <button
                                onClick={handleIncrement}
                                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <Button className="w-36 h-7 p-3 bg-stone-300 rounded-lg text-[#1B2B56] inline-flex justify-center items-center gap-1 hover:bg-stone-300" onClick={() => navigate("/bakery/bakery-details/dispatcher-details")}>Davom etish</Button>
                </div>
            </div>
        </div>
    )
}