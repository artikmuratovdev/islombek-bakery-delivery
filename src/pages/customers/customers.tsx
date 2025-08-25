import { Button, Input } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";

export const Customers = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div
            className="flex gap-x-2 items-center"
            onClick={() => navigate("/dashboard")}
          >
            <Button
              onClick={() => navigate("/trade")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold font-inter">
              Mijozlar
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[30%] px-3">
        <Input
          placeholder="Mijozlar qidirish"
          type="search"
          className="bg-white border border-yellow-400"
        />
        <div className="mt-5 space-y-3">
          <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6">
            <h2 className="text-red-700 text-base font-bold font-['Inter'] leading-tight">
              Farxod restoran
            </h2>
            <h2 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none w-32 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
              99 567 87 45
            </h2>
          </div>
          <div
            className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6"
            onClick={() => navigate("customer-details")}
          >
            <h2 className="text-green-700 text-base font-bold font-['Inter'] leading-tight">
              Begoyim
            </h2>
            <h2 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none w-14 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
              10:51
            </h2>
            <h2 className="text-blue-950 text-base font-semibold font-['Inter'] leading-none w-32 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
              99 567 87 45
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
