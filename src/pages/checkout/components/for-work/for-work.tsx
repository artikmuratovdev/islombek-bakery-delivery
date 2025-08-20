import { BottomSheet, Button } from "@/components";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Delete, Edit, Plus, Third } from "@/icons"
import { useState } from "react";
import { Bottom, BottomCheck } from "..";

export const ForoWrk = () => {
    const [open, setOpen] = useState(false);
    const [openPlus, setOpenPlus] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);
    return (
        <div>
            <div className="w-full h-10 relative bg-red-700 rounded-lg outline outline-1 outline-offset-[-1px] outline-red-700 overflow-hidden flex justify-between items-center px-6">
                <h2 className="text-white text-sm font-bold">Ilyos (Yopuvchi)</h2>
                <div className="flex gap-x-2 items-center">
                    <h2 className="text-white text-sm font-bold">500 000</h2>
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
                <div className="w-[360px] h-10 bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 fixed bottom-[40px] right-4 flex justify-center items-center" onClick={() => setOpenCheck(true)}>
                    <h3 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none">Kassani yopish</h3>
                </div>
                <Button
                    className="fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
                    onClick={() => setOpenPlus(true)}
                >
                    <Plus />
                </Button>
            </div>
            <BottomSheet open={openPlus} setOpen={setOpenPlus} children={<Bottom onClose={() => setOpenPlus(false)} />} />
            <BottomSheet open={openCheck} setOpen={setOpenCheck} children={<BottomCheck onClose={() => setOpenCheck(false)} />} />
        </div>
    )
}