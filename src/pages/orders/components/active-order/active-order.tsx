import { useState } from "react";
import { Checkbox } from "@/icons";
import { useNavigate } from "react-router-dom";
import { useGetActiveOrdersQuery } from "@/app/api";

interface Order {
    id: number;
    time: string;
    amount: number | string;
    address: string;
}

const orders: Order[] = [
    { id: 1, time: "00:30:45", amount: 500, address: "Begoyim" },
    { id: 2, time: "00:45:20", amount: 300, address: "Erkatoy bog'cha" },
];

export const ActiveOrder = () => {
    const navigate = useNavigate();
    const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

    const { data: order } = useGetActiveOrdersQuery();

    console.log(order)

    const handleCheckboxClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!selectedOrders.includes(id)) {
            setSelectedOrders((prev) => [...prev, id]);
        }
    };

    return (
        <div>
            <div className="grid gap-4 text-center">
                <div className="grid grid-cols-3 gap-4 bg-[#ffcb15] p-2 font-semibold text-[#1B2B56] rounded">
                    <span>Vaqti</span>
                    <span>Soni</span>
                    <span>Manzili</span>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                {orders.map((order) => {
                    const isSelected = selectedOrders.includes(order.id);
                    const isMapOrder = order.address === "Yotto";

                    return (
                        <div
                            key={order.id}
                            className={`w-full h-10 rounded-lg border border-yellow-400 grid grid-cols-8 justify-between items-center px-4 ${isSelected ? "bg-white" : "bg-yellow-400"
                                }`}
                            onClick={() => {
                                navigate("order-map");
                            }}
                        >
                            <h2 className="text-blue-950 text-base font-bold leading-tight col-span-2">
                                {order.time}
                            </h2>
                            <h2 className="text-blue-950 text-base text-center font-bold leading-tight">
                                {order.amount}
                            </h2>
                            <h2 className="text-blue-950 text-base text-center font-bold leading-tight col-span-4">
                                {order.address}
                            </h2>
                            {!isSelected && !isMapOrder && (
                                <div className="flex items-center justify-end" onClick={(e) => handleCheckboxClick(e, order.id)}>
                                    <Checkbox />
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex items-center justify-between px-4" onClick={() => navigate("order-map")}>
                    <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">00:45:20</h3>
                    <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">300</h3>
                    <h3 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">Yotto</h3>
                </div>
            </div>
        </div>
    );
};
