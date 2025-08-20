/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";

export const PaymentDrawer = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // ❌ API o‘rniga statik qarz miqdori
  const debtor = { debt: 120000 }; // masalan, qarz 120 000 so‘m

  const amount = watch("amount", 0);
  const remainingDebt = (debtor?.debt || 0) - Number(amount || 0);

  // ❌ API so‘rovi o‘rniga console.log
  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    console.log("Qoldiq qarz:", remainingDebt);

    setOpen(false); // drawer yopish
    // navigate("/orders") o‘rniga shunchaki console.log
    console.log("Orders sahifasiga o'tildi");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative bg-white/0 rounded-xl border-2 border-[#ffcb15] mt-8 p-5">
        <div className="grid w-full items-center gap-1.5">
          {/* Pul miqdori */}
          <div className="flex flex-col gap-y-2">
            <Label
              htmlFor="amount"
              className="text-[#ffcb15] text-base font-semibold font-inter leading-none mt-[18px]"
            >
              Olingan pul
            </Label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Pul miqdorini kiriting" }}
              render={({ field }) => (
                <>
                  <Input
                    type="number"
                    id="amount"
                    placeholder="Pul miqdorini kiriting"
                    {...field}
                    className="bg-white text-[#1b2b56] font-semibold rounded-lg"
                  />
                  {errors.amount && (
                    <span className="text-red-500 text-sm">
                      {errors.amount.message?.toString()}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          {/* Qoldiq qarz */}
          <div className="flex justify-end mt-[13px]">
            <Label className="text-white text-sm font-semibold font-inter leading-none">
              Qoldiq:{" "}
              <span className="text-[#ffcb15]">
                {remainingDebt.toLocaleString()}
              </span>
            </Label>
          </div>

          {/* To'lov turi */}
          <div className="w-full flex flex-col gap-y-3 justify-between mt-[20px]">
            <Label className="text-[#ffcb15] text-base font-semibold font-inter leading-none">
              To'lov turi:
            </Label>
            <Controller
              control={control}
              name="paymentType"
              rules={{ required: "To'lov turi is required" }}
              render={({ field }) => (
                <div className="flex text-white gap-x-5">
                  <div className="flex items-center space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value="cash"
                      id="r1"
                      className="accent-[#ffcb15] w-6 h-6"
                    />
                    <Label htmlFor="r1">Naqd</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      {...field}
                      type="radio"
                      value="card"
                      id="r2"
                      className="accent-[#ffcb15] w-6 h-6"
                    />
                    <Label htmlFor="r2">Karta</Label>
                  </div>
                </div>
              )}
            />
            {errors.paymentType && (
              <p className="text-red-500 text-sm">
                {errors.paymentType.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Saqlash tugmasi */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-[#ffcb15] w-1/4 text-[#1b2b56] font-inter hover:text-[#ffcb15] mt-5"
          >
            Saqlash
          </Button>
        </div>
      </div>
    </form>
  );
};
