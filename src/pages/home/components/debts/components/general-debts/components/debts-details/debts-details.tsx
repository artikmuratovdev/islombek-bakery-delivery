import { Button } from "@/components";
import { UZBTime } from "@/components/common/uzb-time";
import { Tabs } from "@/components/tabs/tabs";
import { ArrowLeft, Dollar, Notifications } from "@/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DollarBottom } from "../bottom-sheet";
import {
  useLazyGetDriverDebtClientDebtPaymentsQuery,
  useLazyGetDriverDebtClientsTotalDebtQuery,
} from "@/app/api";
import { BottomSheet } from "@/components/common";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@radix-ui/react-select";

export const DebtsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("zakaslar");

  const [getDriverDebtClientsTotalDebt, { data: totalDebt }] =
    useLazyGetDriverDebtClientsTotalDebtQuery();

  const [getDriverDebtClientDebtPayments, { data: payments }] =
    useLazyGetDriverDebtClientDebtPaymentsQuery();

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { label: "Zakaslar", value: "zakaslar" },
    { label: "To'lovlar", value: "to'lovlar" },
  ];

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (activeTab === "zakaslar") {
      getDriverDebtClientsTotalDebt({
        clientId: id as string,
        startDate: today,
        endDate: today,
      });
    } else if (activeTab === "to'lovlar") {
      getDriverDebtClientDebtPayments({
        id: id as string,
        startDate: today,
        endDate: today,
      });
    }
  }, [activeTab, id]); // activeTab o'zgarganda so'rov ketadi

  const todayBalance =
    totalDebt?.reduce((sum, item) => sum + Number(item.debtAmount || 0), 0) ||
    0;

  return (
    <div>
      {/* Header */}
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
              {todayBalance?.toLocaleString("ru-RU")}
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-[30%] px-4">
        <div className="flex justify-end px-1">
          <UZBTime
            fetchDate
            onSelectDate={(date) => {
              if (activeTab === "zakaslar") {
                getDriverDebtClientsTotalDebt({
                  clientId: id as string,
                  startDate: date.startDate,
                  endDate: date.endDate,
                });
              } else if (activeTab === "to'lovlar") {
                getDriverDebtClientDebtPayments({
                  id: id as string,
                  startDate: date.startDate,
                  endDate: date.endDate,
                });
              }
            }}
          />
        </div>

        {/* Tabs */}
        <div className="mt-5">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* ✅ Zakaslar */}
          {activeTab === "zakaslar" && (
            <div className="mt-5 flex flex-col gap-y-2">
              {totalDebt?.map((item) => (
                <Card
                  key={item._id}
                  className="bg-white rounded-xl shadow-md border-none"
                >
                  <div
                    className="flex justify-between items-center px-4 pt-2 p-2 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="text-[#1C2C57] text-sm font-semibold">
                      {item.date}
                    </div>
                    <div className="flex space-x-4 text-sm font-semibold items-center">
                      <span className="text-green-700">{item.totalAmount}</span>
                      <span className="text-red-700">{item?.debtAmount}</span>
                      {isOpen ? (
                        <ChevronUp className="text-[#1C2C57] w-4 h-4" />
                      ) : (
                        <ChevronDown className="text-[#1C2C57] w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <Separator />
                  {isOpen && (
                    <CardContent className="text-xs space-y-3 pt-2 pb-4">
                      {item?.orders?.map((element) => (
                        <div className="space-y-1">
                          <div className="font-semibold">
                            {element?.createdAt?.slice(11, 16)}
                            <span className="ml-2 font-normal">
                              {element?.acceptedDriver?.fullName}
                            </span>
                          </div>
                          <div className="space-y-1 flex flex-col">
                            {element?.breadsInfo?.map((bread) => (
                              <div className="flex justify-between">
                                <span>{bread?.title}</span>
                                <span>{bread?.amount}</span>
                                <span>{bread?.breadPrice}</span>
                                <span>{bread?.amount * bread?.breadPrice}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="pt-1 space-y-1 text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>Summa</span>
                          <span>{item.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>To’landi</span>
                          <span className="text-green-400">
                            {item?.paidAmount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Qoldi</span>
                          <span className="text-red-400">
                            {item?.debtAmount}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* ✅ To'lovlar */}
          {activeTab === "to'lovlar" && (
            <div className="mt-5 flex flex-col gap-y-2">
              {payments?.map((item) => (
                <div
                  key={item._id}
                  className="w-full h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-2"
                >
                  <h2 className="text-green-700 text-base font-semibold font-['Inter']">
                    {item?.paidAmount}
                    <br />
                    <span className="text-red-700 text-base font-semibold font-['Inter']">
                      {item?.debt}
                    </span>
                  </h2>
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
                      {item?.createdAt?.slice(0, 10)}
                    </h2>
                    <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
                      {item?.createdAt?.slice(11, 16)}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeTab === "to'lovlar" && (
        <Button
          className="fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
          onClick={() => setOpen(true)}
        >
          <Dollar />
        </Button>
      )}

      <BottomSheet
        open={open}
        setOpen={setOpen}
        children={<DollarBottom setOpen={setOpen} />}
      />
    </div>
  );
};
