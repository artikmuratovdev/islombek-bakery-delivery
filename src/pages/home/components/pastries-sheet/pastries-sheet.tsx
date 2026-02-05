import { Button } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { Props } from "./types";
import { formatNumberWithSpaces } from "@/utils";

export const PastriesSheet = ({ count, setCount, isLoading }: Props) => {
  const { control, setValue, getValues, handleSubmit } = useForm({
    defaultValues: { tempCount: count },
  });

  const handleDecrement = () => {
    const currentValue = getValues("tempCount");
    if (currentValue > 0) {
      setValue("tempCount", currentValue - 1);
    }
  };

  const handleIncrement = () => {
    setValue("tempCount", getValues("tempCount") + 1);
  };

  const onSubmit = (data: { tempCount: number }) => {
    setCount(data.tempCount);
  };

  return (
    <div className="w-full px-3.5 mt-[26px] mb-28 pt-5 pb-3 bg-white rounded-2xl border-2 border-[#ffcb15]">
      <div className="flex flex-col items-center">
        <div className=" text-[#1b2b56] text-xl font-extrabold font-['Inter'] leading-relaxed pb-2">
          Olib ketish
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[70%] m-auto flex items-center justify-between"
        >
          <Button
            type="button"
            onClick={handleDecrement}
            className="h-12 pl-6 pr-5 py-3 bg-[#1b2b56] rounded-tl-[100px] rounded-bl-[100px] border-[#1b2b56] justify-center items-center gap-2 inline-flex"
          >
            <div className="text-[#ffcb15] text-lg font-semibold font-['Poppins'] leading-normal">
              -
            </div>
          </Button>
          <Controller
            name="tempCount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={formatNumberWithSpaces(field.value ?? 0)}
                className="h-12 w-[100%] p-3 bg-white border text-center border-[#a8a8a8] justify-center items-center gap-2.5 inline-flex"
                onChange={(e) => {
                  const value = Number(e.target.value.replace(/\s/g, ""));
                  if (value >= 0 && !isNaN(value)) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
          <Button
            type="button"
            onClick={handleIncrement}
            className="h-12 pl-6 pr-5 py-3 bg-[#1b2b56] rounded-tr-[100px] rounded-br-[100px] border-[#1b2b56] justify-center items-center gap-2 inline-flex"
          >
            <div className="text-[#ffcb15] text-lg font-semibold font-['Poppins'] leading-normal">
              +
            </div>
          </Button>
        </form>
        <h4 className="text-[#1b2b56] text-xl font-extrabold font-['Inter'] leading-relaxed">
          Xamir
        </h4>
      </div>
      <div className="flex justify-end">
        <Button
          className="w-1/3 mt-4 bg-[#ffcb15] text-[#1b2b56]"
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? "..." : "Kiritish"}
        </Button>
      </div>
    </div>
  );
};
