import { Button } from "@/components";
import { ArrowLeft, Notifications, Plus } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBakeryBreadQuery,
  useGetBakeryQuery,
  useUpdateBakeryBreadMutation,
} from "@/app/api";
import { useEffect, useState } from "react";
import { GetBakeryBreadResponse } from "@/app/api/bakery/type";
import { toast, Toaster } from "react-hot-toast";

export const BakeryBread = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState<"OLISH" | "BERISH">("OLISH");
  const [breads, setBreads] = useState<GetBakeryBreadResponse[]>();
  const [isBreadInputChange, setIsBreadInputChange] = useState<{
    [key: string]: boolean;
  }>({});

  // doughType va amount ni saqlash (barcha action lar uchun umumiy)
  const [savedAmounts, setSavedAmounts] = useState<{
    [doughType: string]: number;
  }>({});

  const { id = "" } = useParams();
  const { data: bakery } = useGetBakeryQuery({ id });
  const { data: bread, refetch } = useGetBakeryBreadQuery({ id, action });
  const [updateBread, { isLoading }] = useUpdateBakeryBreadMutation();

  useEffect(() => {
    if (bread) {
      // Serverdan kelgan ma'lumotni saqlangan qiymatlar bilan birlashtirish
      const updatedBreads = bread.map((item) => {
        const savedAmount = savedAmounts[item.doughType];
        if (savedAmount !== undefined) {
          return { ...item, amount: savedAmount };
        }
        return item;
      });
      setBreads(updatedBreads);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bread]);

  useEffect(() => {
    refetch();
  }, [action, refetch]);

  const isDisabled =
    bread && breads ? breads.every((item) => item.amount === 0) : true;

  async function handleUpdateBread() {
    if (id && breads && breads.length > 0) {
      try {
        const updateBreads = breads?.filter((item) => item.amount > 0);
        const res = await updateBread({ id, breads: updateBreads, action });

        if ("data" in res && "message" in res.data!) {
          toast.success(res.data.message as string);
        } else if ("error" in res) {
          toast.error("Non ma'lumotlarini yangilashda xatolik yuz berdi");
        }
      } catch {
        toast.error("Non ma'lumotlarini yangilashda xatolik yuz berdi");
      }
    }
  }

  return (
    <div>
      <Toaster />
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-white text-2xl font-semibold">
            {bakery && bakery.bakerRoom.title}
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-32 px-6 space-y-5">
        {breads ? (
          <>
            {breads && breads.length > 0 ? (
              <>
                {breads.map((breadItem) => (
                  <div
                    key={breadItem.doughType}
                    className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#FFCC15] overflow-hidden flex items-center px-4 justify-between"
                  >
                    <div className="text-[#1C2C57] text-sm font-bold flex-1">
                      {breadItem.breadTitle}
                    </div>
                    <p className="text-[#1C2C57] text-sm font-bold flex gap-x-1 flex-1">
                      {breadItem.limitBreadCount}
                    </p>
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        className="w-8 h-8 flex justify-center items-center bg-[#1C2C57] rounded-full text-[#FFCC15] transition"
                        onClick={() => {
                          setBreads((prev) => {
                            const updated = prev?.map((item) =>
                              item.doughType === breadItem.doughType
                                ? {
                                    ...item,
                                    amount:
                                      item.amount > 0
                                        ? item.amount - 1
                                        : item.amount,
                                  }
                                : item,
                            );
                            if (updated) {
                              const newAmounts: { [key: string]: number } = {};
                              updated.forEach((item) => {
                                newAmounts[item.doughType] = item.amount;
                              });
                              setSavedAmounts((prev) => ({
                                ...prev,
                                ...newAmounts,
                              }));
                            }
                            return updated;
                          });
                        }}
                      >
                        -
                      </button>
                      {isBreadInputChange[breadItem.doughType] ? (
                        <input
                          type="text"
                          autoFocus
                          value={breadItem.amount}
                          className="w-10 px-2 outline-none border text-center"
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value <= breadItem.limitBreadCount) {
                              setBreads((prev) => {
                                const updated = prev?.map((item) =>
                                  item.doughType === breadItem.doughType
                                    ? {
                                        ...item,
                                        amount: value,
                                      }
                                    : item,
                                );
                                if (updated) {
                                  const newAmounts: { [key: string]: number } =
                                    {};
                                  updated.forEach((item) => {
                                    newAmounts[item.doughType] = item.amount;
                                  });
                                  setSavedAmounts((prev) => ({
                                    ...prev,
                                    ...newAmounts,
                                  }));
                                }
                                return updated;
                              });
                            }
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            setIsBreadInputChange((prev) => ({
                              ...prev,
                              [breadItem.doughType]: false,
                            }))
                          }
                        />
                      ) : (
                        <span
                          className="text-[#1C2C57] text-sm font-bold w-6 text-center"
                          onClick={() =>
                            setIsBreadInputChange((prev) => ({
                              ...prev,
                              [breadItem.doughType]: true,
                            }))
                          }
                        >
                          {breadItem.amount}
                        </span>
                      )}
                      <button
                        className="w-8 h-8 flex justify-center items-center bg-[#1C2C57] rounded-full text-[#FFCC15] transition"
                        onClick={() => {
                          setBreads((prev) => {
                            const updated = prev?.map((item) =>
                              item.doughType === breadItem.doughType &&
                              item.amount < item.limitBreadCount
                                ? {
                                    ...item,
                                    amount: item.amount + 1,
                                  }
                                : item,
                            );
                            if (updated) {
                              const newAmounts: { [key: string]: number } = {};
                              updated.forEach((item) => {
                                newAmounts[item.doughType] = item.amount;
                              });
                              setSavedAmounts((prev) => ({
                                ...prev,
                                ...newAmounts,
                              }));
                            }
                            return updated;
                          });
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-white font-[600] text-[18px] text-center">
                Nonlar mavjud emas
              </p>
            )}

            <div className="my-10 flex items-center gap-5 justify-between">
              <div
                className="flex-1 flex items-center gap-2"
                onClick={() => setAction("OLISH")}
              >
                <div className="w-6 h-6 border-2 border-[#FFCC15] rounded-full flex items-center justify-center p-1">
                  {action === "OLISH" && (
                    <div className="w-full h-full rounded-full bg-[#FFCC15]"></div>
                  )}
                </div>
                <p className="text-white font-[600] text-[21px]">Olib ketish</p>
              </div>
              <div
                className="flex-1 flex items-center gap-2"
                onClick={() => setAction("BERISH")}
              >
                <div className="w-6 h-6 border-2 border-[#FFCC15] rounded-full flex items-center justify-center p-1">
                  {action === "BERISH" && (
                    <div className="w-full h-full rounded-full bg-[#FFCC15]"></div>
                  )}
                </div>
                <p className="text-white font-[600] text-[21px]">Berish</p>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <Button
                disabled={isDisabled || isLoading}
                className="w-36 h-7 p-3 bg-[#CDC7C7] rounded-lg text-[#1B2B56] inline-flex justify-center items-center gap-1 hover:bg-[#CDC7C7] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleUpdateBread}
              >
                {isLoading ? "Yuborilmoqda..." : "Davom etish"}
              </Button>
            </div>
          </>
        ) : (
          <p className="text-white font-[600] text-[18px] text-center">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};
