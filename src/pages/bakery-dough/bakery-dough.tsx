import {
  useGetBakeryDoughInfoQuery,
  useGetBakeryQuery,
  useUpdateBakeryDoughMutation,
} from "@/app/api";
import { GetBakeryDoughResponse } from "@/app/api/bakery/type";
import { Button } from "@/components";
import { ArrowLeft, Notifications, Plus } from "@/icons";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const BakeryDough = () => {
  const navigate = useNavigate();
  const [doughs, setDoughs] = useState<GetBakeryDoughResponse[]>();
  const [isDoughInputChange, setIsDoughInputChange] = useState<{
    [key: string]: boolean;
  }>({});

  const { id = "" } = useParams();
  const { data: bakery } = useGetBakeryQuery({ id });
  const { data: dough } = useGetBakeryDoughInfoQuery({ id });
  const [updateDough] = useUpdateBakeryDoughMutation();

  useEffect(() => {
    if (dough) {
      setDoughs(dough);
    }
  }, [dough]);

  const isDisabled =
    dough && doughs ? doughs.every((item) => item.amount === 0) : true;

  async function handleUpdateDough() {
    if (id && doughs && doughs.length > 0) {
      const updateDoughs = doughs.filter((item) => item.amount > 0);
      const res = await updateDough({ id, doughs: updateDoughs });

      if ("data" in res && "message" in res.data!) {
        toast.success(res.data.message as string);
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
        {doughs ? (
          doughs && doughs.length > 0 ? (
            <>
              {doughs.map((doughItem) => (
                <div
                  key={doughItem.doughType}
                  className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#FFCC15] overflow-hidden flex items-center px-4 justify-between"
                >
                  <div className="text-[#1C2C57] text-sm font-bold">
                    {doughItem.doughTitle}
                  </div>
                  <p className="text-[#1C2C57] text-sm font-bold flex gap-x-1">
                    {doughItem.limitDoughCount}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 flex justify-center items-center bg-[#1C2C57] rounded-full text-[#FFCC15] transition"
                      onClick={() =>
                        setDoughs((prev) =>
                          prev?.map((item) =>
                            item.doughType === doughItem.doughType
                              ? {
                                  ...item,
                                  amount:
                                    item.amount > 0
                                      ? item.amount - 1
                                      : item.amount,
                                }
                              : item
                          )
                        )
                      }
                    >
                      -
                    </button>
                    {isDoughInputChange[doughItem.doughType] ? (
                      <input
                        type="text"
                        autoFocus
                        value={doughItem.amount}
                        className="w-10 px-2 outline-none border text-center"
                        onChange={(e) =>
                          Number(e.target.value) <= doughItem.limitDoughCount &&
                          setDoughs((prev) =>
                            prev?.map((item) =>
                              item.doughType === doughItem.doughType
                                ? {
                                    ...item,
                                    amount: Number(e.target.value),
                                  }
                                : item
                            )
                          )
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          setIsDoughInputChange((prev) => ({
                            ...prev,
                            [doughItem.doughType]: false,
                          }))
                        }
                      />
                    ) : (
                      <span
                        className="text-[#1C2C57] text-sm font-bold w-6 text-center"
                        onClick={() =>
                          setIsDoughInputChange((prev) => ({
                            ...prev,
                            [doughItem.doughType]: true,
                          }))
                        }
                      >
                        {doughItem.amount}
                      </span>
                    )}
                    <button
                      className="w-8 h-8 flex justify-center items-center bg-[#1C2C57] rounded-full text-[#FFCC15] transition"
                      onClick={() =>
                        setDoughs((prev) =>
                          prev?.map((item) =>
                            item.doughType === doughItem.doughType &&
                            item.amount < item.limitDoughCount
                              ? {
                                  ...item,
                                  amount: item.amount + 1,
                                }
                              : item
                          )
                        )
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 flex justify-end">
                <Button
                  disabled={isDisabled}
                  className="w-36 h-7 p-3 bg-[#CDC7C7] rounded-lg text-[#1B2B56] inline-flex justify-center items-center gap-1 hover:bg-[#CDC7C7]"
                  onClick={handleUpdateDough}
                >
                  Davom etish
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white font-[600] text-[18px] text-center">
              Xamirlar mavjud emas
            </p>
          )
        ) : (
          <p className="text-white font-[600] text-[18px] text-center">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};
