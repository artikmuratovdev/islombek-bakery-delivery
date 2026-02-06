import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Notifications } from "@/icons";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { breadInfo, preOrderPostReq } from "@/app/api/orderApi/types";
import BreadList from "@/components/form/BreadLists/BreadList";
import { useCreatePreOrderMutation, useGetBreadPricesQuery } from "@/app/api";

export const NewOrder = () => {
  const { data: breadPrice } = useGetBreadPricesQuery();
  const [addPreOrder, { isLoading }] = useCreatePreOrderMutation();

  const [breads, setBreads] = useState<breadInfo[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<preOrderPostReq>({
    defaultValues: {
      client: "",
      phone: "",
      address: "",
      commit: "",
      deliveryTime: "",
      paidAmount: 0,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: preOrderPostReq) => {
    data.breadsInfo = breads;
    if (data.phone.startsWith("+998") || data.phone.startsWith("998")) {
      data.phone = data.phone.replace(/\D/g, "").slice(-9);
    } else {
      data.phone = data.phone.replace(/\D/g, "").trim();
    }

    if (data.phone.length !== 9) {
      toast.error("Telefon raqamni to`g`ri kiriting");
      return;
    }

    data.breadsInfo = data.breadsInfo.filter(
      (element: breadInfo) => element.amount !== 0,
    );
    if (data.breadsInfo.length === 0) {
      toast.error("Non miqdorini kiriting");
      return;
    }

    data.deliveryTime = data.deliveryTime.split("T").join(" ");

    console.log(data);
    const { message } = await addPreOrder(data).unwrap();
    if (message) {
      toast.success(message);
      navigate("/orders", { state: "preOrder" });
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <Toaster />
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto items-center justify-between">
          <Button
            onClick={() => navigate("/orders", { state: "preOrder" })}
            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h4 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
            Yangi buyurtma
          </h4>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-[70px] p-[16px] space-y-3"
      >
        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Mijoz
          </Label>
          <Controller
            name="client"
            control={control}
            rules={{ required: "Mijozni kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Mijozni kiriting"
                  id="client"
                  type="text"
                  className=" text-blue-950 bg-white"
                />
                {errors.client && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors.client.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Telefon
          </Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Telefonni kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Telefonni kiriting"
                  id="phone"
                  type="tel"
                  className=" text-blue-950 bg-white"
                />
                {errors.phone && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors?.phone?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Manzil
          </Label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "Manzilni kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Manzilni kiriting"
                  id="address"
                  type="text"
                  className=" text-blue-950 bg-white"
                />
                {errors.address && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors?.address?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Izoh
          </Label>
          <Controller
            name="commit"
            control={control}
            rules={{ required: "Izohni kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Izohni kiriting"
                  id="commit"
                  type="text"
                  className=" text-blue-950 bg-white"
                />
                {errors.commit && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors?.commit?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Topshirish vaqti
          </Label>
          <Controller
            name="deliveryTime"
            control={control}
            rules={{ required: "Topshirish vaqtini kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="deliveryTime"
                  type="datetime-local"
                  className=" w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2"
                />
                {errors.deliveryTime && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors?.deliveryTime?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-2 space-y-2">
          <Label className="text-yellow-400 text-base font-semibold leading-none">
            Olingan pul
          </Label>
          <Controller
            name="paidAmount"
            control={control}
            rules={{
              required: "Olingan pul miqdorini kiriting",
              min: {
                value: 1,
                message: "Pul miqdori 0 dan katta bo'lishi kerak",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Faqat raqamlar kiritilishi mumkin",
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Olingan pul miqdorini kiriting"
                  id="paidAmount"
                  type="text"
                  value={(field.value ?? 0).toLocaleString("ru-RU")}
                  onChange={(e) => {
                    const val = Number(e.target.value.replace(/\D/g, ""));
                    setValue("paidAmount", isNaN(val) ? 0 : val);
                  }}
                  className="w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2"
                />
                {errors.paidAmount && (
                  <p className="text-red-600 font-semibold text-base">
                    {errors.paidAmount.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-3 pt-2 mb-5">
          {breadPrice && (
            <BreadList breadPrices={breadPrice} setBreads={setBreads} />
          )}
        </div>
        <div className="flex justify-end mb-5">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-36 h-8 p-3 bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Yuborilmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
};
