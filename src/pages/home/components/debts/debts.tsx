import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLazyGetDriverDebtClientsTodayDebtsQuery,
  useLazyGetDriverDebtClientsTotalDebtsQuery,
} from "@/app/api";

import { Button, Input } from "@/components";
import { Tabs } from "@/components/tabs/tabs";
import { ArrowLeft, Notifications } from "@/icons";

export const Debts = () => {
  const navigate = useNavigate();

  const [
    getDriverDebtClientsTotalDebts,
    { data: driverDebtClients, isLoading },
  ] = useLazyGetDriverDebtClientsTotalDebtsQuery();

  const [
    getDriverDebtClientsTodayDebts,
    { data: driverDebtClientsToday, isLoading: isLoadingToday },
  ] = useLazyGetDriverDebtClientsTodayDebtsQuery();

  const [activeTab, setActiveTab] = useState("umumiy qarzlar");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const tabs = [
    { label: "Umumiy qarzlar", value: "umumiy qarzlar" },
    { label: "Bugungi qarzlar", value: "bugungi qarzlar" },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (activeTab === "umumiy qarzlar") {
      getDriverDebtClientsTotalDebts({ search: debouncedSearch });
    } else {
      getDriverDebtClientsTodayDebts({ search: debouncedSearch });
    }
  }, [
    activeTab,
    debouncedSearch,
    getDriverDebtClientsTotalDebts,
    getDriverDebtClientsTodayDebts,
  ]);

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
              Qarzdorlar
            </h2>
            <h2 className="text-white text-2xl font-semibold font-inter">
              8 000 000
            </h2>
          </div>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-[30%] w-[100%] px-4">
        <Input
          className="w-full bg-white border border-yellow-400"
          type="search"
          placeholder="Qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-5">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="mt-5">
          {activeTab === "umumiy qarzlar" && (
            <div className="space-y-3">
              {isLoading && (
                <p className="text-center text-gray-500 font-medium">
                  Yuklanmoqda...
                </p>
              )}

              {!isLoading && (driverDebtClients ?? []).length > 0
                ? (driverDebtClients ?? []).map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(`/debts/${item._id}`)}
                      className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6 cursor-pointer"
                    >
                      <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                        {item.fullName}
                      </h2>
                      <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                        {item.balance}
                      </h2>
                    </div>
                  ))
                : !isLoading && (
                    <p className="text-center text-gray-500 font-medium">
                      Ma'lumot yo‘q
                    </p>
                  )}
            </div>
          )}

          {activeTab === "bugungi qarzlar" && (
            <div className="space-y-3">
              {isLoadingToday && (
                <p className="text-center text-gray-500 font-medium">
                  Yuklanmoqda...
                </p>
              )}

              {!isLoadingToday && (driverDebtClientsToday ?? []).length > 0
                ? (driverDebtClientsToday ?? []).map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate("debts-details")}
                      className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center px-6 cursor-pointer"
                    >
                      <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                        {item.client?.fullName}
                      </h2>
                      <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                        {item.client?.balance}
                      </h2>
                    </div>
                  ))
                : !isLoadingToday && (
                    <p className="text-center text-gray-500 font-medium">
                      Ma'lumot yo‘q
                    </p>
                  )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
