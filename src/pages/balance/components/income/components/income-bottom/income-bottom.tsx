import { Button } from "@/components"

interface Props {
    onClose: () => void;
}

export const IncomeBottom = ({ onClose }: Props) => {
    return (
        <div>
            <div className="w-full h-9 relative bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 mt-5 flex justify-between items-center px-6 mb-5">
                <h2 className="text-blue-950 text-base font-semibold font-['Inter']">1 500 000</h2>
                <h2 className="text-blue-950 text-base font-semibold font-['Inter']">11:30</h2>
                <h2 className="text-blue-950 text-base font-semibold font-['Inter']">20.03.2025</h2>
            </div>
            <div className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-center items-center">
                <h2 className="text-blue-950 text-base font-semibold font-['Inter']">Shuhrat(Admin)</h2>
            </div>
            <div className="flex justify-center mt-20">
                <Button className="w-16 h-6 bg-yellow-400 rounded-lg text-[#1B2B56] hover:bg-[#FFCC15]" onClick={onClose}>Yopish</Button>
            </div>
        </div>
    )
}