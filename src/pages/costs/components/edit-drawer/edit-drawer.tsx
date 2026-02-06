/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { SelectReasons } from "./selectReasons";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useState } from "react";
import { formatNumberWithSpaces } from "@/utils";

// 🔹 Static demo users
const demoUsers = [
  { _id: "u1", fullName: "Ali Vali" },
  { _id: "u2", fullName: "Gulnoza Raxmon" },
  { _id: "u3", fullName: "Davron Sobirov" },
];

export const EditDrawer = ({
  setOpen,
  expense,
}: {
  setOpen: (open: boolean) => void;
  expense: any;
}) => {
  const [selectedReason, setSelectedReason] = useState(expense?.reason || "");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: expense?.amount || "",
      receiver: expense?.receiver?._id || "",
      reason: expense?.reason || "",
    },
  });

  const onSubmit = (data: any) => {
    const sum = parseInt(data.sum);
    const receiver = data.receiver;
    const selectedUser = demoUsers.find((u) => u._id === receiver);

    if (!selectedUser) {
      alert("Tanlangan foydalanuvchi topilmadi.");
      return;
    }

    alert(
      `Xarajat o'zgartirildi:\nFoydalanuvchi: ${selectedUser.fullName}\nSumma: ${sum}\nSabab: ${selectedReason}`,
    );
    reset();
    setOpen(false);
  };

  return (
    <div>
      <div className="w-full h-auto bg-white/0 rounded-xl border-2 border-[#ffcb15] mt-[37px] p-[12px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-start text-[12px] text-[#FFCC15] font-[600] block">
              Summa
            </label>
            <Controller
              name="sum"
              control={control}
              rules={{ required: "Summa kiriting" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  value={formatNumberWithSpaces(field.value || 0)}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    field.onChange(val);
                  }}
                  className={`border outline-none p-1 rounded-[8px] w-full ${
                    errors.sum ? "border-red-500" : "border-[#FFCC15]"
                  }`}
                />
              )}
            />
            {errors.sum && (
              <p className="text-red-500 text-xs mt-1">
                {errors.sum.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="text-start text-[12px] text-[#FFCC15] font-[600] block">
              Sababi
            </label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <SelectReasons
                  {...field}
                  setId={setSelectedReason}
                  title="Sabab qo'shish"
                  className={`w-full border outline-none p-1 rounded-[8px] bg-white ${
                    errors.reason ? "border-red-500" : "border-[#FFCC15]"
                  }`}
                />
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reason.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className="text-start text-[12px] text-[#FFCC15] font-[600] block">
              Foydalanuvchi
            </label>
            <Controller
              name="receiver"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    className={`w-full border outline-none p-1 rounded-[8px] bg-white ${
                      errors.receiver ? "border-red-500" : "border-[#FFCC15]"
                    }`}
                  >
                    <SelectValue placeholder="Foydalanuvchi tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoUsers.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.receiver && (
              <p className="text-red-500 text-xs mt-1">
                {errors.receiver.message?.toString()}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="self-end bg-[#099431] rounded-lg hover:bg-[#099431] mt-[25px] px-4 py-2 text-white font-semibold font-inter w-1/3"
          >
            O'zgartirish
          </Button>
        </form>
      </div>
    </div>
  );
};
