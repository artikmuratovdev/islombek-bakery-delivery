import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export const SaleSheet = () => {
  const [paymentType, setPaymentType] = useState("cash");

  // Statik mijozlar
  const customers = [
    { _id: "1", fullName: "Ali Valiyev" },
    { _id: "2", fullName: "Dilnoza Karimova" },
    { _id: "3", fullName: "Jasur Tursunov" },
  ];

  return (
    <form>
      <div className="w-full">
        <div className="relative rounded-xl border-2 border-[#ffcb15] mt-8 p-5">
          <div className="grid w-full items-center gap-1.5">
            {/* Miqdor */}
            <Label
              htmlFor="amount"
              className="text-[#ffcb15] text-base font-semibold"
            >
              Soni
            </Label>
            <Input
              type="number"
              id="amount"
              placeholder="Soni"
              className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full"
            />

            {/* Mijoz tanlash */}
            <Label
              htmlFor="customer"
              className="text-[#ffcb15] text-base font-semibold mt-3"
            >
              Mijozni tanlang
            </Label>
            <Select>
              <SelectTrigger className="h-[42px] bg-white rounded-lg border-2 border-[#ffcb15] text-[#1b2b56]">
                <SelectValue placeholder="Mijozni tanlang" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-lg border border-[#ffcb15] mt-[9px]">
                {customers.map((item) => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.fullName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* To'lov turi */}
            <div className="w-full mt-[20px] flex flex-col gap-y-3">
              <Label className="text-[#ffcb15] text-[15px] font-semibold leading-none">
                To'lov turi:
              </Label>
              <RadioGroup
                defaultValue="cash"
                className="flex gap-x-2"
                onValueChange={(value) => setPaymentType(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="r1" />
                  <Label htmlFor="r1">Naqd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="r2" />
                  <Label htmlFor="r2">Karta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debt" id="r3" />
                  <Label htmlFor="r3">Qarz</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Agar qarz bo'lsa */}
            {paymentType === "debt" && (
              <div className="mt-4">
                <Label
                  htmlFor="debt"
                  className="text-[#ffcb15] text-base font-semibold"
                >
                  Olingan pul
                </Label>
                <Input
                  type="number"
                  id="debt"
                  placeholder="Olingan pul"
                  className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full mt-2"
                />
              </div>
            )}
          </div>

          {/* Submit tugma */}
          <div className="flex justify-end">
            <Button
              type="button"
              className="w-2/5 bg-[#ffcb15] text-[#1b2b56] font-semibold mt-4"
            >
              Yuborish
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
