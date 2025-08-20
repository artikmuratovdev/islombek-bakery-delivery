import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { Plus } from "@/icons";
import { useState } from "react";

export const Bottom = () => {
    const [count, setCount] = useState(3);


    const handleIncrement = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCount(prev => (prev > 0 ? prev - 1 : 0));
    };
    return (
        <div className="w-full h-80 relative bg-white/0 rounded-xl outline outline-2 outline-offset-[-2px] outline-yellow-400 px-4 py-1 mt-4">
            <div className="space-y-3">
                <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between mt-8">
                    <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
                    <p className="text-blue-950 text-sm font-bold flex gap-x-1">4 000</p>
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
                    <p className="text-blue-950 text-sm font-bold flex gap-x-1">5 000</p>
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
            <h1 className="text-white text-lg font-semibold font-['Inter'] leading-none mt-2">Umumiy summa: 800 000</h1>
            <div className="mt-2">
                <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Olingan pul</Label>
                <Input className="bg-white border border-yellow-400" type="number" placeholder="Pulni kiriting" defaultValue={"500000"} />
            </div>
            <div className="mt-3 flex justify-end">
                <Button className="w-28 h-8 pl-6 pr-9 pt-1.5 pb-4 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-start items-start gap-3 text-[#1B2B56] hover:bg-[#FFCC15]">Saqlash</Button>
            </div>
        </div>
    )
}