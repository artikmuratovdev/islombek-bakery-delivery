import { useGetOneOrderQuery, useSubmitAnOrderMutation } from "@/app/api";
import { breadInfo } from "@/app/api/orderApi/types";
import { Button, Input } from "@/components";
import BreadList from "@/components/form/BreadLists/BreadList";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { useHandleRequest } from "@/hooks";
import { ArrowLeft, Notifications } from "@/icons";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type FormData = {
  client: string;
  phone: string;
  address: string;
  isDebt: boolean;
  paidAmount: number;
};

export const AcceptedOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order } = useGetOneOrderQuery(id as string);
  const [submitOrder] = useSubmitAnOrderMutation();
  const handleRequest = useHandleRequest();

  const [breads, setBreads] = useState<breadInfo[]>([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<FormData>();
  const isDebt = watch("isDebt");

  useEffect(() => {
    if (order) {
      reset({
        client:
          typeof order.client === "string"
            ? order.client
            : order.client.fullName,
        phone: order.phone,
        address: order.address,
      });
      setBreads(
        order.breadsInfo.map((b) => ({
          ...b,
          amount: b.amount || 0,
        })),
      );
    }
  }, [order, reset]);

  const handleMainSubmit = async (data: FormData) => {
    const paidAmount = isDebt ? data.paidAmount : (order?.debtAmount as number);

    await handleRequest({
      request: async () => {
        const response = await submitOrder({
          id: id as string,
          body: { paidAmount, breadsInfo: breads },
        });
        return response;
      },
      onSuccess: (data) => {
        toast.success(data.data.message || "Muvaffaqiyatli saqlandi");
        navigate("/orders", { state: "activeOrder" });
      },
      onError: (error: { data?: { message?: string }; message?: string }) => {
        const errorMessage =
          error?.data?.message || error?.message || "Xatolik yuz berdi";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div>
      <Toaster />
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto items-center justify-between">
          <Button
            onClick={() => navigate("/orders", { state: "activeOrder" })}
            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h4 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
            Sotuv
          </h4>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleMainSubmit)}
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
                  readOnly
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
                  readOnly
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
                  readOnly
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

        <div className="space-y-3 pt-2 mb-5">
          {breads && (
            <BreadList breadPrices={breads} priceHide setBreads={setBreads} />
          )}
        </div>
        <div className="flex justify-between mb-5">
          {order?.client !== "Boshqa" && (
            <Controller
              name="isDebt"
              control={control}
              render={({ field }) => (
                <Label
                  htmlFor="qarz"
                  className="text-white flex gap-x-2 items-center"
                >
                  <span className="relative border-2 border-yellow-400 rounded-full w-6 h-6">
                    <Checkbox
                      id="qarz"
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none data-[state=checked]:bg-yellow-400 rounded-full data-[state=checked]:text-yellow-400`}
                    />
                  </span>
                  Qarz
                </Label>
              )}
            />
          )}

          <Button className="w-36 h-8 p-3 bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15] ml-auto">
            Saqlash
          </Button>
        </div>

        <Drawer open={isDebt} onOpenChange={(open) => setValue("isDebt", open)}>
          <DrawerContent className="bg-blue-950 rounded-t-2xl border-0">
            <form className="h-full px-3 py-4 flex flex-col gap-y-3 m-4 my-8 border-2 border-yellow-500 rounded-xl">
              {/* PaidAmount */}
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="paidAmount"
                  className="text-yellow-400 font-bold"
                >
                  Olingan pul
                </label>
                <Controller
                  name="paidAmount"
                  control={control}
                  rules={{
                    required: "Pulni kiriting",
                    min: { value: 0, message: "0 dan katta bo‘lishi kerak" },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        type="number"
                        value={(field.value ?? "")
                          .toString()
                          .replace(/^0+(?=\d)/, "")}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          field.onChange(isNaN(val) ? 0 : Number(val));
                        }}
                        className="w-full p-1 border border-[#FFCC15] rounded-lg bg-white
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [appearance:textfield]"
                      />
                      {errors.paidAmount && (
                        <span className="text-red-500">
                          {errors.paidAmount.message?.toString()}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-white">
                  Qarz: {order?.debtAmount.toLocaleString("ru-RU")}
                </span>
                <Button type="submit" className="text-blue-950 bg-yellow-500">
                  Yuborish
                </Button>
              </div>
            </form>
          </DrawerContent>
        </Drawer>
      </form>
    </div>
  );
};
