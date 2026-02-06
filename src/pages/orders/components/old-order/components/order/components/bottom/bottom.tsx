import { useSetupOrderMutation } from "@/app/api";
import { breadInfo } from "@/app/api/orderApi/types";
import { Button, Input } from "@/components";
import BreadList from "@/components/form/BreadLists/BreadList";
import { Label } from "@/components/ui/label";
import { useHandleRequest } from "@/hooks";
import { formatNumberWithSpaces } from "@/utils";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  id: string;
  breads: breadInfo[];
  setBreads: React.Dispatch<React.SetStateAction<breadInfo[]>>;
  debt: number;
  closeBottom?: () => void;
};

export const Bottom = ({ breads, setBreads, id, debt, closeBottom }: Props) => {
  const [setupOrder, { isLoading }] = useSetupOrderMutation();
  const [paidAmount, setPaidAmount] = useState(0);
  const handleRequest = useHandleRequest();

  const onSubmit = async () => {
    const data = {
      id,
      body: {
        breadsInfo: breads.filter((b) => b.amount !== 0),
        paidAmount,
      },
    };

    await handleRequest({
      request: async () => {
        const response = await setupOrder(data);
        return response;
      },
      onSuccess: (data) => {
        console.log("Data", data.data.message);
        toast.success(data.data.message);
        closeBottom && closeBottom();
      },
      onError: (err: any) => {
        console.log("Error", err.message);
        toast.error(err.message);
      },
    });
  };
  return (
    <div className="w-full h-80 relative bg-white/0 rounded-xl outline outline-2 outline-offset-[-2px] outline-yellow-400 px-4 py-1 mt-4">
      <div className="space-y-3 pt-2 mb-5">
        {breads && (
          <BreadList
            breadPrices={breads}
            debtShow={debt}
            priceHide
            setBreads={setBreads}
          />
        )}
      </div>
      <div className="mt-2">
        <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">
          Olingan pul
        </Label>
        <Input
          className="bg-white border border-yellow-400"
          type="text"
          placeholder="Pulni kiriting"
          value={formatNumberWithSpaces(paidAmount)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/\s/g, ""));
            setPaidAmount(isNaN(val) ? 0 : val);
          }}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          className="w-28 h-8 pl-6 pr-9 pt-1.5 pb-4 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-start items-start gap-3 text-[#1B2B56] hover:bg-[#FFCC15] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Yuborilmoqda..." : "Saqlash"}
        </Button>
      </div>
    </div>
  );
};
