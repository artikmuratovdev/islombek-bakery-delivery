import { BottomSheet, Button, Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components"
import { Label } from "@/components/ui/label";
import { ArrowLeft, Notifications, Plus } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Bottom } from "./components";

export const OrderPage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
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
                        Buyurtma
                    </h3>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[21%] px-4">
                <div className="space-y-2 mt-2">
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
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Olgan xodim</Label>
                        <Select>
                            <SelectTrigger className="w-full bg-white border border-yellow-400">
                                <SelectValue placeholder="Izzat (Haydovchi)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="blueberry">Blueberry</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Olingan pul</Label>
                        <Input className="bg-white border border-yellow-400" type="number" placeholder="Pulni kiriting" defaultValue={"500 000"} />
                    </div>
                </div>
                <div className="w-full h-24 bg-white rounded-lg border border-yellow-400 mt-5 space-y-3">
                    <div className="flex justify-between px-4 items-center mt-3">
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Chig’atoy</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">500</h2>
                    </div>
                    <div className="flex justify-between px-4 items-center">
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Buxonka</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">200</h2>
                    </div>
                    <div className="flex justify-between px-4 items-center">
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Patir</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
                        <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">50</h2>
                    </div>
                </div>
                <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-2">Umumiy summa: 800 000</h1>
                <div className="w-full h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-4 mt-3">
                    <h3 className="text-blue-950 text-base font-semibold font-['Inter'] w-40">Izzat (Haydovchi) <span className="text-green-700">500 000</span></h3>
                    <h3 className="text-blue-950 text-base font-semibold font-['Inter'] w-20">29.03.2025 <span>10:30</span></h3>
                </div>
            </div>
            <div className="mt-10 px-4 flex justify-between items-center">
                <Button className="w-36 h-7 p-3 bg-yellow-400 rounded-lg text-[#1C2C57] inline-flex justify-center items-center gap-1 hover:bg-yellow-400">Topshirish</Button>
                <Button
                    className="fixed right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
                    onClick={() => setOpen(true)}
                >
                    <Plus />
                </Button>
            </div>
            <BottomSheet open={open} setOpen={setOpen} children={<Bottom />} />
        </div>
    )
}
