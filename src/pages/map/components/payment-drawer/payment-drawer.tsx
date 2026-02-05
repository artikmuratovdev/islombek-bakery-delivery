import { useState } from "react";
import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { formatNumberWithSpaces } from "@/utils";

export const PaymentDrawer = () => {
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [debt, setDebt] = useState(0);

  // Statik narx
  const breadPrice = 3000;

  // Umumiy summa
  const totalSum = (amount * breadPrice).toLocaleString();

  return (
    <div>
      <div className="w-full">
        <div className="relative rounded-xl border-2 border-[#ffcb15] mt-8 p-5">
          <div className="grid w-full items-center gap-1.5">
            {/* Miqdor */}
            <Label
              htmlFor="soni"
              className="text-[#ffcb15] text-base font-semibold leading-none"
            >
              Soni
            </Label>
            <Input
              type="text"
              id="soni"
              placeholder="Miqdorini kiriting"
              value={formatNumberWithSpaces(amount)}
              onChange={(e) => {
                const val = Number(e.target.value.replace(/\s/g, ""));
                setAmount(isNaN(val) ? 0 : val);
              }}
              className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full"
            />

            {/* Narx va summa */}
            <div className="flex justify-between text-white text-base font-semibold mt-[13px]">
              <Label className="text-white text-base font-semibold">
                narxi: {breadPrice.toLocaleString()}
              </Label>
              <Label className="text-white text-base font-semibold">
                summa: {totalSum}
              </Label>
            </div>

            {/* To'lov turi */}
            <div className="w-full flex flex-col gap-y-2 mt-[20px]">
              <Label className="text-[#ffcb15] text-base font-semibold leading-none">
                To'lov turi:
              </Label>

              <div className="flex text-white gap-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="cash"
                    id="r1"
                    checked={paymentType === "cash"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="accent-[#ffcb15] w-6 h-6"
                  />
                  <Label htmlFor="r1">Naqd</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="card"
                    id="r2"
                    checked={paymentType === "card"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="accent-[#ffcb15] w-6 h-6"
                  />
                  <Label htmlFor="r2">Karta</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="debt"
                    id="r3"
                    checked={paymentType === "debt"}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="accent-[#ffcb15] w-6 h-6"
                  />
                  <Label htmlFor="r3">Qarz</Label>
                </div>
              </div>

              {/* Agar qarz bo'lsa */}
              {paymentType === "debt" && (
                <div className="mt-4">
                  <Label
                    htmlFor="qarzMiqdori"
                    className="text-[#ffcb15] text-base font-semibold leading-none"
                  >
                    Qarz miqdori:
                  </Label>
                  <Input
                    type="text"
                    id="qarzMiqdori"
                    placeholder="Qarz miqdori"
                    value={formatNumberWithSpaces(debt)}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/\s/g, ""));
                      setDebt(isNaN(val) ? 0 : val);
                    }}
                    className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full mt-2"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Yuborish tugmasi */}
          <div className="flex justify-end">
            <Button className="w-1/4 bg-[#ffcb15] text-[#1b2b56] mt-4">
              Kiritish
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
