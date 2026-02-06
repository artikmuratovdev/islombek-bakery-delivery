import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { formatNumberWithSpaces } from "@/utils";
import { useState } from "react";

export const SaleBottom = () => {
  const [amount, setAmount] = useState(0);
  return (
    <div className="w-full h-40 relative bg-white/0 rounded-xl outline outline-2 outline-offset-[-2px] outline-yellow-400 mt-8 p-3">
      <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">
        Olingan pul
      </Label>
      <Input
        placeholder="Summa kiriting"
        type="text"
        value={formatNumberWithSpaces(amount)}
        onChange={(e) => {
          const val = Number(e.target.value.replace(/\s/g, ""));
          setAmount(isNaN(val) ? 0 : val);
        }}
        className="bg-white border border-yellow-400"
      />
      <h3 className="text-white text-base font-semibold font-['Inter'] leading-none mt-2">
        Qarz: 800 000
      </h3>
      <div className="flex justify-end">
        <Button className="w-28 h-8 pl-6 pr-9 pt-1.5 pb-4 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-start items-start gap-3 text-[#1B2B56] hover:bg-yellow-400">
          Yuborish
        </Button>
      </div>
    </div>
  );
};
