import { useGetAllUsersQuery, useMeQuery } from "@/app/api";
import { useCloseCashMutation } from "@/app/api/checkout";
import { SelectUser } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useHandleRequest } from "@/hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export const CloseCheckout = () => {
  const { data: getUsers, isLoading: getUsersLoading } = useGetAllUsersQuery({
    roles: ["ADMIN"],
  });
  const [open, setOpen] = useState(false);
  const [closeCash, { isLoading }] = useCloseCashMutation();
  const { data: me } = useMeQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      amount: 0,
      toUser: "",
      reason: "",
    },
  });

  const handleRequest = useHandleRequest();

  const onSubmit = async (data: any): Promise<void> => {
    if (isNaN(data.amount)) {
      throw new Error("Summa to'g'ri formatda emas.");
    }
    const sentData = { bakerRoomId: me?._id, ...data };
    sentData.amount = Number(data.amount);
    await handleRequest({
      request: () => closeCash(sentData),
      onSuccess: (data: any) => {
        toast.success(data.data.message || "Kassa muvaffaqiyatli yopildi");
        reset();
      },
      onError: (error: any) => {
        toast.error(error.message || "Xatolik yuz berdi");
      },
    });
  };

  return (
    <div>
      <Toaster />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="text-[#1C2C57] fixed bottom-5 left-[20px] right-[20px]">
            <Button
              variant="outline"
              className="border border-[#FFCC15] w-full text-[16px]"
              onClick={() => setOpen(true)}
            >
              Kassani yopish
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
              <SheetTitle className="text-white font-[600] text-left">
                Umumiy balans: {Number(me?.balance).toLocaleString("ru-RU")}
              </SheetTitle>
              <label
                htmlFor="sum"
                className="text-start text-[12px] text-[#FFCC15] font-[600]"
              >
                Berilgan pul
              </label>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: "Summani kiritish shart!",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Faqat raqam kiriting",
                  },
                }}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    type="text"
                    className="border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full"
                    placeholder="0"
                    value={value ? Number(value).toLocaleString("ru-RU") : ""}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      onChange(rawValue);
                    }}
                    {...field}
                  />
                )}
              />
              {errors.amount && (
                <span className="text-red-500">{errors.amount.message}</span>
              )}

              <label
                htmlFor=""
                className="text-start text-[12px] text-[#FFCC15] font-[600]"
              >
                Olgan xodim
              </label>
              <Controller
                name="toUser"
                control={control}
                render={({ field }) => (
                  <SelectUser
                    className="bg-white"
                    userData={getUsers}
                    setId={field.onChange}
                    title="Xodim tanlash"
                    isLoading={getUsersLoading}
                    {...field}
                  />
                )}
              />
              {errors.toUser && (
                <span className="text-red-500">{errors.toUser.message}</span>
              )}

              <label
                htmlFor="reason"
                className="text-start text-[12px] text-[#FFCC15] font-[600]"
              >
                Sababi
              </label>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="border border-[#FFCC15] outline-none p-1 rounded-[8px]"
                    {...field}
                  />
                )}
              />
              {errors.reason && (
                <span className="text-red-500">{errors.reason.message}</span>
              )}

              <Button
                variant={"yellow"}
                className="text-[16px] font-[600] ml-auto mt-[10px] text-[#1C2C57] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
