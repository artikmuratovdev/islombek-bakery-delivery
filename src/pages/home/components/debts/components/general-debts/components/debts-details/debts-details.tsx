import { BottomSheet, Button } from "@/components";
import { UZBTime } from "@/components/common/uzb-time";
import { Tabs } from "@/components/tabs/tabs";
import { ArrowLeft, Dollar, Notifications } from "@/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Accardion, Payments } from "..";
import { DollarBottom } from "../bottom-sheet";
import { useLazyGetDriverDebtClientsTotalDebtQuery } from "@/app/api";

export const DebtsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("zakaslar");
  const [getDriverDebtClientsTotalDebt, { data: totalDebt }] =
    useLazyGetDriverDebtClientsTotalDebtQuery();

  useEffect(() => {
    getDriverDebtClientsTotalDebt({
      clientId: id as string,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    });
  }, []);

  const [open, setOpen] = useState(false);
  const tabs = [
    { label: "Zakaslar", value: "zakaslar" },
    { label: "To'lovlar", value: "to'lovlar" },
  ];

  console.log(totalDebt);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div
            className="flex gap-x-2 items-center"
            onClick={() => navigate("/debts")}
          >
            <Button
              onClick={() => navigate("/debts")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold font-inter"></h2>
            <h2 className="text-white text-2xl font-semibold font-inter">
              {totalDebt?.totalAmount}
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[30%] px-4">
        <div className="flex justify-end px-1">
          <UZBTime
            fetchDate
            onSelectDate={(date) => {
              getDriverDebtClientsTotalDebt({
                clientId: id as string,
                startDate: date.startDate,
                endDate: date.endDate,
              });
            }}
          />
        </div>
        <div className="mt-5">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === "zakaslar" && <Accardion />}
          {activeTab === "to'lovlar" && <Payments />}
        </div>
      </div>
      <Button
        className="fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
        onClick={() => setOpen(true)}
      >
        <Dollar />
      </Button>
      <BottomSheet open={open} setOpen={setOpen} children={<DollarBottom />} />
    </div>
  );
};
