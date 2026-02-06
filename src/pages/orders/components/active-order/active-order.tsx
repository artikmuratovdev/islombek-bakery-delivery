import { Checkbox } from "@/icons";
import { useNavigate } from "react-router-dom";
import { useGetActiveOrdersQuery } from "@/app/api";
import { useEffect, useState } from "react";

export const getTimes = (date: Date | string, currentTime: number) => {
  const past = new Date(date).getTime();
  const diffMs = currentTime - past;

  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
};

export const ActiveOrder = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetActiveOrdersQuery();

  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    refetch();
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div>
      <div className="mb-4">
        <div className="grid grid-cols-8 gap-4 bg-[#ffcb15] px-4 py-3 font-semibold text-[#1B2B56] rounded-lg shadow-sm">
          <span className="col-span-4 text-left">Manzili</span>
          <span className="text-center">Soni</span>
          <span className="col-span-2 text-center">Vaqti</span>
          <span></span>
        </div>
      </div>

      <div className="space-y-3">
        {data?.orders?.map((order) => (
          <div
            key={order._id}
            className={`w-full min-h-[48px] rounded-lg border border-yellow-400 grid grid-cols-8 gap-4 items-center px-4 py-3 cursor-pointer transition-all hover:shadow-md ${
              order.acceptedDriver ? "bg-white" : "bg-yellow-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (order._id && !order.acceptedDriver) {
                navigate(`order-map/${order._id}`);
              } else if (order._id && order.acceptedDriver) {
                navigate(`accepted/${order._id}`);
              } else {
                console.error("Order ID is missing");
              }
            }}
          >
            <h2 className="text-blue-950 text-sm font-bold leading-tight col-span-4 text-left">
              {order.address || "No address provided"}
            </h2>
            <h2 className="text-blue-950 text-sm text-center font-bold leading-tight">
              {order.breadCount || 0}
            </h2>
            <h2 className="text-blue-950 text-sm font-bold leading-tight col-span-2 text-center">
              {getTimes(order.createdAt || "", currentTime)}
            </h2>
            {!order.acceptedDriver && (
              <div className="flex items-center justify-end">
                <Checkbox />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
