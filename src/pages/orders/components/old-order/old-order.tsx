import { Button } from "@/components"
import { Plus } from "@/icons"
import { useNavigate } from "react-router-dom"

export const OldOrder = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="grid gap-4 text-center">
                <div className="grid grid-cols-3 gap-4 bg-[#ffcb15] p-2 font-semibold text-[#1B2B56] rounded">
                    <>
                        <span>Vaqti</span>
                        <span>Soni</span>
                        <span className="text-[12px] mt-1">Topshirish vaqti</span>
                    </>
                </div>
            </div>
            <div className="mt-5 space-y-4">
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex items-center justify-between px-4">
                    <h3 className="text-blue-950 text-sm font-semibold font-['Inter']">Afruz <br /> to'yxonasi</h3>
                    <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">500</h3>
                    <h3 className="text-blue-950 text-xs font-semibold font-['Inter']">16.04.2025 10:30</h3>
                </div>
                <div className="w-full h-10 bg-yellow-400 rounded-lg border border-yellow-400 flex items-center justify-between px-4">
                    <h3 className="text-blue-950 text-sm font-semibold font-['Inter']">Azizbek <br /> to'yxonasi</h3>
                    <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">500</h3>
                    <h3 className="text-blue-950 text-xs font-semibold font-['Inter']">16.04.2025 10:30</h3>
                </div>
                <div className="w-full h-10 bg-red-700 rounded-lg border border-red-700 flex items-center justify-between px-4">
                    <h3 className="text-white text-sm font-semibold font-['Inter']">Begoyim</h3>
                    <h3 className="text-white text-base font-bold font-['Inter'] leading-tight">500</h3>
                    <h3 className="text-white text-xs font-semibold font-['Inter']">16.04.2025 10:30</h3>
                </div>
            </div>
            <Button
                className="fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
                onClick={() => navigate("/new-order")}
            >
                <Plus />
            </Button>
        </div>
    )
}