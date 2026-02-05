/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { TextArea } from "@/components/common";
import { formatNumberWithSpaces } from "@/utils";

export const CloseDrawer = ({ setOpen }: any) => {
  const form = useForm<any>();
  const watchSumma = form.watch("actual") || 800000;

  // 🔹 Mock foydalanuvchi
  const user = {
    _id: "123",
    fullName: "Men (User)",
    branch: "Toshkent filial",
  };

  // 🔹 Mock ishchilar (users)
  const users = [
    { _id: "456", fullName: "Dilnoza Karimova" },
    { _id: "789", fullName: "Sherzod Qodirov" },
    { _id: "101", fullName: "Ali Valiyev" },
  ];

  // 🔹 Mock buyurtmalar
  const orders = [
    { _id: "o1", driver: { _id: "123" }, amount: 10, cost: 20000 },
    { _id: "o2", driver: { _id: "123" }, amount: 5, cost: 30000 },
  ];

  // 🔹 Mock xarajatlar
  const expenses = [
    { _id: "e1", receiver: { _id: "123" }, amount: 50000 },
    { _id: "e2", receiver: { _id: "123" }, amount: 25000 },
  ];

  // 🔹 Mock avvalgi reportlar
  const reports = [
    { _id: "r1", from: { _id: "123" }, actual: 100000 },
    { _id: "r2", from: { _id: "789" }, actual: 200000 },
  ];

  // 🔹 Hisob-kitob
  const totalAmount =
    orders.reduce((sum, item) => sum + item.amount * item.cost, 0) -
    expenses.reduce((sum, item) => sum + item.amount, 0) -
    reports
      .filter((item) => item.from._id === user._id)
      .reduce((sum, item) => sum + item.actual, 0);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    setTimeout(() => {
      console.log("📤 Yuborilgan ma’lumot:", {
        expected: totalAmount,
        actual: Number(data.actual),
        comment: data.comment,
        receiver: data.receiver,
      });
      setSubmitting(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <div>
      <div className="mx-auto w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative bg-white/0 rounded-xl border-2 border-[#ffcb15] mt-8 p-5 flex flex-col">
            {/* Summa */}
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="summa"
                className=" text-[#ffcb15] text-base font-semibold font-inter leading-none"
              >
                Summa
              </Label>
              <div className="flex gap-x-0.5">
                <Controller
                  name="actual"
                  control={form.control}
                  rules={{ required: "Summa kiriting!" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      value={formatNumberWithSpaces(field.value ?? 0)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/\s/g, ""));
                        field.onChange(isNaN(val) ? 0 : val);
                      }}
                      className="w-1/2 py-2 bg-white rounded-l-lg text-lg flex items-center font-semibold pl-[21px] h-12"
                    />
                  )}
                />
                <div className="w-1/2 py-2 bg-white rounded-r-lg text-lg flex items-center font-semibold pl-[21px] h-12">
                  {totalAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ") || 0}
                </div>
              </div>
            </div>

            {/* Sabab maydoni */}
            {Number(watchSumma) < totalAmount && (
              <div className="flex flex-col gap-y-2">
                <Label
                  htmlFor="message"
                  className="text-[#ffcb15] text-base font-semibold font-inter leading-none mt-[22px]"
                >
                  Sababi
                </Label>
                <Controller
                  name="comment"
                  control={form.control}
                  rules={{ required: "Sababini kiriting!" }}
                  render={({ field }) => (
                    <>
                      <TextArea
                        {...field}
                        className="h-[97px] bg-white rounded-lg"
                      />
                      <span className="text-red-600 text-lg mt-7 text-left ml-1">
                        {form.formState.errors.comment?.message?.toString()}
                      </span>
                    </>
                  )}
                />
              </div>
            )}

            {/* Ishchi tanlash */}
            {users.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <Label
                  htmlFor="message"
                  className="text-[#ffcb15] text-base font-semibold font-inter leading-none mt-[22px]"
                >
                  Ishchi
                </Label>
                <Controller
                  name="receiver"
                  control={form.control}
                  defaultValue={users[0]._id}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-[42px] bg-white rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter">
                        <SelectValue placeholder="Ishchini tanlang" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-lg border border-[#ffcb15] mt-[9px]">
                        {users.map((user) => (
                          <SelectItem key={user._id} value={user._id}>
                            {user.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}

            {/* Yuborish tugmasi */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="w-2/5 bg-[#099431] rounded-lg text-[#fff] font-inter hover:text-[#ffcb15] mt-10"
              >
                {submitting ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
