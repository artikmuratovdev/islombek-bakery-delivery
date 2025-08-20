import { BottomSheet, Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Notifications, ArrowLeft, Plus } from "@/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SaleBottom } from "./components";

export const SalePage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  const [open, setOpen] = useState(false);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <button
            className="h-7 p-1 bg-[#ffcb15] rounded-[50px] justify-start items-center gap-2.5 inline-flex"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft />
          </button>
          <h2 className="text-white text-xl font-semibold font-inter">Sotuv</h2>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[70px] p-4">
        <div className="space-y-2">
          <div>
            <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Mijoz</Label>
            <Input className="bg-white border border-yellow-400" type="search" placeholder="Mijoz kiriting" />
          </div>
          <div>
            <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Telefon</Label>
            <Input className="bg-white border border-yellow-400" type="number" placeholder="Telefon kiriting" />
          </div>
          <div>
            <Label className="text-yellow-400 text-base font-semibold font-['Inter'] leading-none">Manzil</Label>
            <Input className="bg-white border border-yellow-400" type="text" placeholder="Mijoz kiriting" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between mt-8">
            <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
            <p className="text-blue-950 text-sm font-bold">4 000</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
              >
                -
              </button>
              <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between">
            <div className="text-blue-950 text-sm font-bold">Patir</div>
            <p className="text-blue-950 text-sm font-bold">5 000</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
              >
                -
              </button>
              <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-8">Umumiy summa: 800 000</h1>
        <div className="flex items-center justify-between mt-10">
          <RadioGroup defaultValue="comfortable" onClick={() => setOpen(true)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" className="text-yellow-400 w-6 h-6 border border-yellow-400 appearance-none checked:w-10 checked:h-10" />
              <Label htmlFor="r1" className="text-white text-xl font-semibold font-['Inter'] leading-none">Qarz</Label>
            </div>
          </RadioGroup>
          <Button className="w-36 h-7 p-3 bg-yellow-400 rounded-lg  inline-flex justify-center items-center gap-1 text-[#1B2B56] hover:bg-yellow-400">Saqlash</Button>
        </div>
      </div>
      <BottomSheet open={open} setOpen={setOpen} children={<SaleBottom />} />
    </div>
  );
};
