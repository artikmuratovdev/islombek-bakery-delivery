import { useNavigate } from "react-router-dom";

export const GeneralDebts = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-3">
            <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6" onClick={() => navigate("debts-details")}>
                <h2
                    className="text-blue-950 text-base font-bold font-['Inter'] leading-tight cursor-pointer"
                >
                    Begoyim
                </h2>
                <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                    500 000
                </h2>
            </div>
            <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6">
                <h2
                    className="text-blue-950 text-base font-bold font-['Inter'] leading-tight cursor-pointer"
                >
                    Alko market
                </h2>
                <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                    500 000
                </h2>
            </div>
        </div>

    )
}