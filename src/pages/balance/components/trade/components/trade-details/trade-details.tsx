import { useGetDriverSavdoQuery } from "@/app/api/dastavchik-savdo-api";
import { Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";

export const TradeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: savdo } = useGetDriverSavdoQuery({ id: id as string });

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div
            className="flex gap-x-2 items-center"
            onClick={() => navigate("/trade")}
          >
            <Button
              onClick={() => navigate("/trade")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
          </div>
          <div className="flex flex-col gap-y-px items-center">
            <h2 className="text-white text-xl font-semibold font-inter">
              {savdo?.address}
            </h2>
            <h2 className="text-white text-2xl font-semibold font-inter">
              {savdo?.phone}
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[34%] px-4 space-y-3">
        {savdo?.breadsInfo?.map((bread) => (
          <div
            key={bread._id}
            className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex justify-between items-center px-4"
          >
            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">
              {bread.title}
            </h2>
            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">
              {bread.breadSoldPrice?.toLocaleString("ru-RU")}
            </h2>
            <h2 className="text-blue-950 text-sm font-bold font-['Inter']">
              {bread.amount?.toLocaleString("ru-RU")}
            </h2>
          </div>
        ))}

        <h1 className="text-white text-[22px] font-semibold leading-none">
          Umumiy summa: {savdo?.totalAmount?.toLocaleString("ru-RU")}
        </h1>
        <h2 className="text-yellow-400 text-2xl font-semibold font-['Inter'] leading-none">
          {savdo?.createdAt.slice(0, 10)} {savdo?.createdAt.slice(11, 16)}
        </h2>
        <div className="w-full h-28 relative rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 px-2 py-3">
          <h3 className="text-yellow-400 text-lg font-semibold font-['Inter'] leading-none">
            {savdo?.commit}
          </h3>
        </div>
        <div className="mt-5 flex flex-col gap-y-3">
          {savdo?.paymentHistory?.map((payment) => (
            <div
              key={payment._id}
              className="border-2 border-[#FFCC15] px-2 py-1 flex justify-between items-center rounded-lg bg-white"
            >
              <div className="flex flex-col gap-y-1">
                <h3 className="text-green-700 text-base font-semibold">
                  {payment?.amount?.toLocaleString("ru-RU")}
                </h3>
                <h3 className="text-red-700 text-base font-semibold">
                  {payment?.totalAmount?.toLocaleString("ru-RU")}
                </h3>
              </div>
              <div className="flex gap-x-1 items-center">
                <h3 className="text-blue-950 text-base font-semibold">
                  {payment.paymentDate.slice(0, 10)}
                </h3>
                <h3 className="text-blue-950 text-base font-semibold">
                  {payment.paymentDate.slice(11, 16)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
