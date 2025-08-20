import { Button } from "@/components"
import { UZBTime } from "@/components/common/uzb-time";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Delete, Edit, Notifications, Third } from "@/icons"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Trade = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openW, setOpenW] = useState(false);
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
                        Savdo
                    </h2>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[23%] w-[100%] flex justify-end px-6">
                <UZBTime />
            </div>
            <div className="px-6 mt-5 space-y-5">
                <div className="w-full h-10 relative bg-red-700 rounded-lg outline outline-1 outline-offset-[-1px] outline-red-700 overflow-hidden flex justify-between items-center px-6">
                    <h2 className="text-white text-sm font-bold">2 000 000</h2>
                    <h2 className="text-white text-sm font-bold">10:24</h2>
                    <h2>
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <Third fill="white" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-40"
                            >
                                <DropdownMenuCheckboxItem className="text-blue-950 text-sm font-semibold flex justify-start gap-x-2"><Edit className="ml-[-20px]" /> Tahrirlash</DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem className="text-red-700 text-sm font-semibold flex justify-start gap-x-2"><Delete className="ml-[-20px]" /> O'chirish</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </h2>
                </div>
                <div className="w-full h-10 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex justify-between items-center px-6" onClick={() => navigate("trade-details")}>
                    <h2 className="text-green-700 text-sm font-bold">1 400 000</h2>
                    <h2 className="text-blue-950 text-sm font-bold">9:25</h2>
                    <h2 className="text-blue-950 text-sm font-bold">Farxod</h2>
                    <h2>
                        <DropdownMenu open={openE} onOpenChange={setOpenE}>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <Third fill="#1C2C57" className="text-blue-950" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-40"
                            >
                                <DropdownMenuCheckboxItem className="text-blue-950 text-sm font-semibold flex justify-start gap-x-2"><Edit className="ml-[-20px]" /> Tahrirlash</DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem className="text-red-700 text-sm font-semibold flex justify-start gap-x-2"><Delete className="ml-[-20px]" /> O'chirish</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </h2>
                </div>
                <div className="w-full h-10 relative bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex justify-between items-center px-6">
                    <h2 className="text-blue-950 text-sm font-bold">2 800 000</h2>
                    <h2 className="text-blue-950 text-sm font-bold">8:20</h2>
                    <h2 className="text-blue-950 text-sm font-bold">Begoyim</h2>
                    <h2>
                        <DropdownMenu open={openW} onOpenChange={setOpenW}>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <Third fill="#1C2C57" className="text-blue-950" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-40"
                            >
                                <DropdownMenuCheckboxItem className="text-blue-950 text-sm font-semibold flex justify-start gap-x-2"><Edit className="ml-[-20px]" /> Tahrirlash</DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem className="text-red-700 text-sm font-semibold flex justify-start gap-x-2"><Delete className="ml-[-20px]" /> O'chirish</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </h2>
                </div>
            </div>
        </div >
    )
}