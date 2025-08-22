/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetDriverSavdoQuery,
  useUbdateDriverSavdoMutation,
} from "@/app/api/dastavchik-savdo-api";
import { ArrowLeft, Notifications, Plus } from "@/icons";
import { Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const TradeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: savdo } = useGetDriverSavdoQuery({ id: id as string });
  const [update] = useUbdateDriverSavdoMutation();

  const [breads, setBreads] = useState<
    {
      _id: string;
      title: string;
      breadPrice: number;
      breadSoldPrice: number;
      amount: number;
    }[]
  >([]);

  useEffect(() => {
    if (savdo?.breadsInfo) {
      setBreads(
        savdo.breadsInfo.map((bread: any) => ({
          _id: bread._id,
          title: bread.title,
          breadPrice: bread.breadPrice,
          breadSoldPrice: bread.breadSoldPrice,
          amount: bread.amount,
        }))
      );
    }
  }, [savdo]);

  const handlePriceChange = (index: number, value: string) => {
    const updated = [...breads];
    updated[index].breadSoldPrice = Number(value);
    setBreads(updated);
  };

  const handleAmountChange = (
    index: number,
    type: "increment" | "decrement"
  ) => {
    const updated = [...breads];
    if (type === "increment") {
      updated[index].amount += 1;
    } else if (type === "decrement" && updated[index].amount > 0) {
      updated[index].amount -= 1;
    }
    setBreads(updated);
  };

  const total = breads.reduce((sum, b) => sum + b.breadSoldPrice * b.amount, 0);

  const onSubmit = async () => {
    const payload = {
      breadsInfo: breads.map((b) => ({
        _id: b._id,
        title: b.title,
        breadPrice: b.breadPrice,
        breadSoldPrice: b.breadSoldPrice,
        amount: b.amount,
      })),
    };
    try {
      await update({
        id: id as string,
        body: payload,
      }).unwrap();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <section>
      {/* Header */}
      <header className="py-3 border-b border-yellow-400 rounded-b-4xl flex justify-between items-center px-4 rounded-b-2xl">
        <button
          className="bg-yellow-400 rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-black w-3 h-3" />
        </button>
        <div className="flex flex-col items-center">
          <h4 className="text-center justify-center text-white text-2xl font-semibold">
            Sotuv
          </h4>
        </div>
        <button onClick={() => navigate("/notifications")}>
          <Notifications className="text-yellow-400" />
        </button>
      </header>

      {/* Main */}
      <main className="mt-5 px-5">
        <div className="flex flex-col gap-y-3">
          {/* Client info */}
          <div className="flex gap-x-1 flex-col">
            <h3 className="text-yellow-400 text-base font-semibold">Mijoz</h3>
            <div className="w-full h-10 mt-1 bg-white rounded-lg border border-yellow-400 flex items-center px-3">
              <h3 className="text-blue-950 text-base font-semibold">
                {savdo?.client}
              </h3>
            </div>
          </div>

          <div className="flex gap-x-1 flex-col">
            <h3 className="text-yellow-400 text-base font-semibold">Telefon</h3>
            <div className="w-full h-10 mt-1 bg-white rounded-lg border border-yellow-400 flex items-center px-3">
              <h3 className="text-blue-950 text-base font-semibold">
                {savdo?.phone}
              </h3>
            </div>
          </div>

          <div className="flex gap-x-1 flex-col">
            <h3 className="text-yellow-400 text-base font-semibold">Manzil</h3>
            <div className="w-full h-10 mt-1 bg-white rounded-lg border border-yellow-400 flex items-center px-3">
              <h3 className="text-blue-950 text-base font-semibold">
                {savdo?.address}
              </h3>
            </div>
          </div>

          {/* Breads List */}
          <div className="flex flex-col gap-x-2 mt-5">
            <div className="flex flex-col gap-y-2">
              {breads.map((bread, index) => (
                <div
                  key={bread._id}
                  className="px-3 py-2 bg-white rounded-lg flex justify-between items-center"
                >
                  <h3 className="text-blue-950 text-sm font-bold">
                    {bread.title}
                  </h3>

                  {/* Price */}
                  <div className="flex gap-x-2 items-center">
                    {savdo?.isClient ? (
                      <input
                        type="number"
                        value={bread.breadSoldPrice}
                        onChange={(e) =>
                          handlePriceChange(index, e.target.value)
                        }
                        className="w-20 border border-yellow-400 rounded px-1 text-blue-950 font-bold"
                      />
                    ) : (
                      <h3 className="text-blue-950 text-sm font-bold">
                        {bread.breadSoldPrice}
                      </h3>
                    )}
                  </div>

                  {/* Amount control */}
                  <div className="flex gap-x-2 items-center">
                    <button
                      onClick={() => handleAmountChange(index, "decrement")}
                      className="w-5 h-5 flex justify-center items-center bg-blue-950 rounded-lg"
                    >
                      <Minus className="text-yellow-400 text-sm" />
                    </button>
                    <h3 className="text-blue-950 text-sm font-bold">
                      {bread.amount}
                    </h3>
                    <button
                      onClick={() => handleAmountChange(index, "increment")}
                      className="w-5 h-5 flex justify-center items-center bg-blue-950 rounded-lg"
                    >
                      <Plus className="text-yellow-400 text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <p className="text-white text-xl font-semibold">
              Umumiy summa: {total.toLocaleString()} so'm
            </p>

            {/* Save Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={onSubmit}
                className="text-blue-950 text-sm font-bold py-2 px-6 bg-yellow-400 rounded-lg"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
