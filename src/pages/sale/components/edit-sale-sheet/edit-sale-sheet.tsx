/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useForm } from "react-hook-form";

export const EditSaleSheet = ({
  id,
  setOpen,
}: {
  id: string;
  setOpen: any;
}) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const paymentType = watch("paymentType");

  const onSubmit = (data: any) => {
    console.log("ID:", id);
    console.log("Form ma'lumotlari:", data);
    alert("O'zgarishlar saqlandi ✅");
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="relative rounded-xl border-2 border-[#ffcb15] mt-8 p-5">
          <div className="grid w-full items-center gap-1.5">
            <Label
              htmlFor="amount"
              className="text-[#ffcb15] text-base font-semibold"
            >
              Soni
            </Label>
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Sonini Kiriting" }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="amount"
                  placeholder="Soni"
                  className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full"
                  {...field}
                />
              )}
            />

            <p className="text-sm text-red-600 ml-1">
              {errors.amount?.message?.toString()}
            </p>

            <div className="w-full mt-[20px] flex flex-col gap-y-3">
              <Label className="text-[#ffcb15] text-[15px] font-semibold leading-none">
                To'lov turi:
              </Label>
              <RadioGroup
                defaultValue="comfortable"
                className="flex gap-x-2"
                onValueChange={(value) => setValue("paymentType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r1" />
                  <Label htmlFor="r1">Naqd</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r2" />
                  <Label htmlFor="r2">Karta</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Qarz</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentType === "compact" && (
              <div className="mt-4">
                <Label
                  htmlFor="debt"
                  className="text-[#ffcb15] text-base font-semibold"
                >
                  Olingan pul
                </Label>
                <Controller
                  name="debt"
                  control={control}
                  rules={{ required: "Olingan pulni kiriting" }}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="debt"
                      placeholder="Olingan pul"
                      className="bg-white text-[#1b2b56] font-semibold rounded-lg w-full mt-2"
                      {...field}
                    />
                  )}
                />

                <p className="text-sm text-red-600 ml-1">
                  {errors.debt?.message?.toString()}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-2/5 bg-[#ffcb15] text-[#1b2b56] font-semibold mt-4"
            >
              O'zgartirish
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
