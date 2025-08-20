import { Button } from "@/components"


interface Props {
    onClose: () => void;
}

export const Bottom = ({ onClose }: Props) => {
    return (
        <div className="px-4">
            <div className="w-full h-52 bg-white/0 rounded-xl border-2 border-yellow-400 mt-5 px-3 py-6 space-y-4">
                <div className="w-full h-7 bg-white rounded-lg border border-yellow-400 flex items-center px-3">
                    <h3 className="text-blue-950 text-xs font-semibold font-['Rubik']">Salim (Parkashchi)</h3>
                </div>
                <div className="w-full h-7 bg-white rounded-lg border border-yellow-400 flex items-center px-3 justify-between">
                    <h3 className="text-blue-950 text-xs font-semibold font-['Rubik']">500 000</h3>
                    <h3 className="text-blue-950 text-xs font-bold font-['Rubik']">04.12.2024 10:35</h3>
                </div>
                <div className="flex justify-end mt-10">
                    <Button className="w-16 h-6 bg-yellow-400 rounded-lg text-[#1B2B56] hover:bg-yellow-400" onClick={onClose}>Yopish</Button>
                </div>
            </div>
        </div>
    )
}