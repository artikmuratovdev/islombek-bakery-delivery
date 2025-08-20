import { BottomSheet, Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";
import { CloseDrawer } from "./components";
import { useState } from "react";

export const CashReport = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🔹 Static ma’lumotlar (API o‘rniga)
  const user = { _id: "u1", fullName: "Ali Valiyev" };

  const reports = [
    {
      _id: "r1",
      actual: 150000,
      from: { _id: "u2", fullName: "Bekzod" },
      receiver: user,
    },
    {
      _id: "r2",
      actual: 200000,
      from: user,
      receiver: { _id: "u3", fullName: "Sardor" },
    },
  ];

  const expenses = [
    { _id: "e1", receiver: user, reason: "Benzin", amount: 50000 },
    { _id: "e2", receiver: user, reason: "Tamirlash", amount: 30000 },
  ];

  const orders = [
    { _id: "o1", driver: user, amount: 10, cost: 7000 },
    { _id: "o2", driver: user, amount: 15, cost: 7000 },
  ];

  // 🔹 Filterlar
  const reportsFilter = reports.filter(
    (item) => item.receiver?._id === user?._id
  );
  const reportsFilterMe = reports.filter(
    (item) => item.from?._id === user?._id
  );
  const expensesFilter = expenses.filter(
    (item) => item.receiver?._id === user?._id && item.reason
  );

  // 🔹 Umumiy hisoblash
  const totalAmount =
    (orders.filter((item) => item.driver?._id === user?._id) ?? []).reduce(
      (sum, item) => sum + (item?.amount * item?.cost || 0),
      0
    ) -
    (expensesFilter?.reduce((sum, item) => sum + (item?.amount || 0), 0) ?? 0) -
    (reportsFilterMe?.reduce((sum, item) => sum + (item?.actual || 0), 0) ?? 0);

  return (
    <div className="w-full h-min-screen">
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl hover:text-[#FFCC15]" />
          </Button>
          <h3 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
            Kassa hisoboti
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-y-[18px] mt-[110px]">
        <div className="w-full px-[22px] pt-3.5 pb-3 bg-white rounded-lg border-2 border-[#ffcb15] items-center justify-between inline-flex">
          <h4 className="text-[#1b2b56] text-base font-semibold font-inter leading-none">
            Balance
          </h4>
          <h4 className="text-[#1b2b56] text-base font-semibold font-inter leading-none">
            {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </h4>
        </div>
        <div
          onClick={() => setOpen(true)}
          className="w-full text-[#1C2C57] font-semibold bg-white rounded-lg border-2 border-[#ffcb15] text-center justify-center items-center py-1"
        >
          Kassani yopish
        </div>
        <div className="space-y-[14px] mb-16">
          {reportsFilter?.map((item) => (
            <div
              key={item._id}
              className="w-full bg-white rounded-lg shadow-[4px_4px_6px_0px_rgba(124,113,113,0.10)] border border-[#ffcb15] flex justify-between p-2 font-semibold"
            >
              <p className="text-[#1b2b56]">{item.actual}</p>
              <div className="flex gap-x-5 mr-3 items-center">
                <p className="text-[#1b2b56]">{item.from.fullName} dan</p>
              </div>
            </div>
          ))}
          {reportsFilterMe?.map((item) => (
            <div
              key={item._id}
              className="w-full bg-white rounded-lg shadow-[4px_4px_6px_0px_rgba(124,113,113,0.10)] border border-[#ffcb15] flex justify-between p-2 font-semibold"
            >
              <p className="text-[#1b2b56]">{item.actual}</p>
              <div className="flex gap-x-5 mr-3 items-center">
                <p className="text-[#1b2b56]">{item.receiver?.fullName} ga</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet
        children={<CloseDrawer setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
        className="bg-[#1b2b56]"
      />
    </div>
  );
};
