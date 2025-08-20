import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react";

export const Accardion = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Card className="w-[360px] bg-white rounded-xl shadow-md border-none">
            <div className="flex justify-between items-center px-4 pt-2 p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="text-[#1C2C57] text-sm font-semibold">29.03.2025</div>
                <div className="flex space-x-4 text-sm font-semibold items-center">
                    <span className="text-green-700">4 000 000</span>
                    <span className="text-red-700">2 000 000</span>
                    {isOpen ? (
                        <ChevronUp className="text-[#1C2C57] w-4 h-4" />
                    ) : (
                        <ChevronDown className="text-[#1C2C57] w-4 h-4" />
                    )}
                </div>
            </div>
            <Separator />
            {isOpen && (
                <CardContent className="text-xs space-y-3 pt-2 pb-4">
                    <div className="space-y-1">
                        <div className="font-semibold">09:40 <span className="ml-2 font-normal">Izzat</span></div>
                        <div className="flex justify-between">
                            <span>Chig’atoy</span><span>500</span><span>3 000</span><span>1 500 000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Patir</span><span>300</span><span>5 000</span><span>1 500 000</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                        <div className="font-semibold">19:40 <span className="ml-2 font-normal">Shoxruh</span></div>
                        <div className="flex justify-between">
                            <span>Chig’atoy</span><span>500</span><span>3 000</span><span>1 500 000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Patir</span><span>500</span><span>3 000</span><span>1 500 000</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="pt-1 space-y-1 text-sm">
                        <div className="flex justify-between font-semibold">
                            <span>Summa</span>
                            <span>6 000 000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>To’landi</span>
                            <span className="text-green-400">4 000 000</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Qoldi</span>
                            <span className="text-red-400">2 000 000</span>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}