import { Button, Input } from "@/components"
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit, Notifications, Plus } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const NewOrder = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);


    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    };
    return (
        <div className="w-full max-w-2xl">
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <Button
                        onClick={() => navigate("/orders")}
                        className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h3 className="text-white text-2xl font-semibold">
                        Yangi buyurtma
                    </h3>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[21%] px-4">
                <div className="space-y-2">
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Mijoz</Label>
                        <Input className="bg-white border border-yellow-400" type="search" placeholder="Mijoz kiriting" defaultValue={"Afruz to'yxonasi"} />
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Telefon</Label>
                        <Input className="bg-white border border-yellow-400" type="number" placeholder="Telefon kiriting" defaultValue={"99 123 45 67"} />
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Manzil</Label>
                        <Input className="bg-white border border-yellow-400" type="text" placeholder="Manzil kiriting" defaultValue={"Shohbekat"} />
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Izoh</Label>
                        <Input className="bg-white border border-yellow-400" type="text" placeholder="Izoh kiriting" defaultValue={"Qolgan pullar qayerda"} />
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Topshirish vaqti</Label>
                        <Input className="bg-white border border-yellow-400" type="datetime-local" placeholder="Mijoz kiriting" />
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Olingan pul</Label>
                        <Input className="bg-white border border-yellow-400" type="number" placeholder="Pulni kiriting" defaultValue={"500 000"} />
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between mt-8">
                        <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
                        <p className="text-blue-950 text-sm font-bold flex gap-x-1">4 000  <Edit /></p>
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
                        <p className="text-blue-950 text-sm font-bold flex gap-x-1">5 000  <Edit /></p>
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
                </div>
                <h2 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-4">Umumiy summa: 800 000</h2>
                <div className="mt-4 flex justify-end">
                    <Button className="w-36 h-7 p-3 bg-yellow-400 rounded-lg text-[#1B2B56] inline-flex justify-center items-center gap-1 hover:bg-yellow-400" onClick={() => navigate("order")}>Saqlash</Button>
                </div>
            </div>
        </div>
    )
}