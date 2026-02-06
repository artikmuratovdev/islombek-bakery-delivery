import { useAcceptOrderMutation, useGetOneOrderQuery } from "@/app/api";
import { Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getTimes } from "../active-order";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHandleRequest } from "@/hooks";

const setPhoneNumber = (number: string) =>
  number.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");

export const OrderMap = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetOneOrderQuery(id as string, { skip: !id });
  const [acceptOrder, { isLoading }] = useAcceptOrderMutation();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const handleRequest = useHandleRequest();

  const acceptOrderData = async () => {
    await handleRequest({
      request: async () => {
        const res = await acceptOrder(id as string);
        return res;
      },
      onSuccess: (data) => {
        toast.success(data.data.message || "Zakaz qabul qilindi ✅");
        navigate("/orders", { state: "activeOrder" });
      },
      onError: (error: { data?: { message?: string } }) => {
        toast.error(error?.data?.message || "Xatolik yuz berdi ❌");
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-2xl">
      <Toaster />
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl mx-auto z-30">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate("/orders", { state: "activeOrder" })}
            className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-white text-2xl font-semibold">Zakazlar</h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[90px] mb-20">
        <div className="px-4">
          <div className="w-full h-24 bg-white rounded-lg border border-yellow-400 mt-2 space-y-2">
            <div className="w-full flex justify-between px-4 items-center mt-3">
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {getTimes(data?.createdAt || "", currentTime)}
              </h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {data?.client
                  ? (data?.client as { fullName: string }).fullName
                  : (data?.client as string)}
              </h2>
            </div>
            <div className="w-full flex justify-between px-4 items-center">
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {data && setPhoneNumber(data?.phone as string)}
              </h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {data?.address}
              </h2>
            </div>
            <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight text-center">
              {data?.commit}
            </h2>
          </div>
          <div className="w-full h-auto bg-white rounded-lg border border-yellow-400 my-2 space-y-3">
            {Array.isArray(data?.breadsInfo) &&
              data?.breadsInfo.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 px-4 items-center py-2"
                >
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight ">
                    {item.title}
                  </h2>
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight text-end">
                    {item.breadSoldPrice.toLocaleString("uz")}
                  </h2>
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight text-end">
                    {item.amount}
                  </h2>
                </div>
              ))}
          </div>
          <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-2">
            Umumiy summa: {data?.totalAmount.toLocaleString("uz")}
          </h1>
          <div className="flex items-end flex-col-reverse">
            <Button
              onClick={acceptOrderData}
              disabled={isLoading}
              className="w-40 h-8 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-center items-center gap-3 text-[#1B2B56] hover:bg-yellow-400 mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Yuborilmoqda..." : "Qabul qilish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
