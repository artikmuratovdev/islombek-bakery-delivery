import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { Notifications, ArrowLeft } from "@/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateActiveOrderMutation,
  useGetBreadPricesQuery,
  useGetClientsQuery,
} from "@/app/api";
import { AddActiveOrderReq, breadInfo, client } from "@/app/api/orderApi/types";
import { Controller, useForm } from "react-hook-form";
import BreadList from "@/components/form/BreadLists/BreadList";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Combobox } from "@/components/common/combobox/Combobox";
import toast, { Toaster } from "react-hot-toast";

export const SalePage = () => {
  const navigate = useNavigate();
  const { data: breadPrice } = useGetBreadPricesQuery();
  const { data: clients } = useGetClientsQuery();
  const [addActive] = useCreateActiveOrderMutation();

  const [breads, setBreads] = useState<breadInfo[]>([]);
  const [open, setOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      client: "",
      phone: "",
      address: "",
      commit: "",
      paidAmount: 0,
      isDebt: false,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onChangeClient = (values: client) => {
    if (values.fullName === "Boshqa") {
      setValue("client", "Boshqa");
      setValue("phone", "");
      setValue("address", "");
      return;
    }

    if (values.fullName) {
      setValue("client", values._id);
    }
    if (values.phone) {
      setValue("phone", values.phone);
    }
    if (typeof values.address === "string") {
      setValue("address", values.address);
    }
  };

  const onSubmit = async (data: any, action: "add" | "submit") => {
    const sentData: AddActiveOrderReq = {
      client: data.client,
      breadsInfo: breads.filter((b) => b.amount !== 0),
      address: data.address.trim(),
      phone: "",
      paidAmount: 0,
    };

    if (data.phone.startsWith("+998")) {
      sentData.phone = data.phone.slice(4).trim();
    } else if (data.phone.startsWith("998")) {
      sentData.phone = data.phone.slice(3).trim();
    } else {
      sentData.phone = data.phone.trim();
    }

    if (!data.isDebt) {
      sentData.paidAmount = sentData.breadsInfo.reduce(
        (acc, cur) => acc + cur.amount * cur.breadSoldPrice,
        0
      );
    } else {
      sentData.paidAmount = data.paidAmount;
      sentData.commit = data.commit;
    }

    if (sentData.breadsInfo.length === 0) {
      toast.error("Non miqdorini kiriting");
      return;
    }

    console.log("Action:", action, "Data:", sentData);

    try {
      await addActive(sentData).unwrap();
      toast.success(action === "add" ? "Sotuv qo‘shildi" : "Qarz yozildi");
      setOpen(false);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error("Xatolik yuz berdi");
      console.error(err);
    }
  };

  const isDebt = watch("isDebt");
  const client = watch("client");

  return (
    <div className="pt-20">
      <Toaster />
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

      <form className="flex flex-col gap-y-2 mb-5 mx-3">
        {/* Mijoz */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="mijoz" className="text-yellow-500 text-base">
            Mijoz
          </label>
          <Controller
            name="client"
            control={control}
            rules={{ required: "Mijozni tanlang" }}
            render={({ field }) => (
              <>
                <Combobox
                  value={field.value}
                  onChange={field.onChange}
                  setValues={onChangeClient}
                  changeBreadPrices={(value) =>
                    setValue("client", value.fullName)
                  }
                  clients={[
                    ...(clients?.clients || []),
                    {
                      _id: "other",
                      fullName: "Boshqa",
                      phone: "",
                      hasOrder: false,
                    },
                  ]}
                  placeholder={field.value || "Mijozni tanlang"}
                />
                {errors.client && (
                  <p className="text-red-500 font-bold text-sm mt-1">
                    {errors.client.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Telefon */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="phone" className="text-yellow-500 text-base">
            Telefon
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Telefonni kiriting" }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Telefon"
                  id="phone"
                  type="tel"
                  className="text-blue-950 bg-white"
                />
                {errors.phone && (
                  <p className="text-red-500 font-bold text-sm">
                    {errors.phone.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Manzil */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="address" className="text-yellow-500 text-base">
            Manzil
          </label>
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
                  className="text-blue-950 bg-white"
                />
                {errors.address && (
                  <p className="text-red-500 font-bold text-sm">
                    {errors.address.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Bread list */}
        {client === "" ? (
          <div className="mt-5 flex flex-col gap-y-2 bg-slate-300 rounded-lg min-h-[135px] items-center justify-center">
            <p className="text-slate-900 text-lg max-w-[270px] font-bold p-2 text-center">
              Mijoz tanlangandan so’ng non miqdorini kirita olasiz
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 flex flex-col gap-y-2">
              {breadPrice && (
                <BreadList breadPrices={breadPrice} setBreads={setBreads} />
              )}
            </div>

            {/* Qarz */}
            <Controller
              name="isDebt"
              control={control}
              render={({ field }) => (
                <div className="flex justify-between items-center">
                  {client && client !== "Boshqa" && (
                    <div className="flex items-center space-x-2">
                      <span className="border-2 flex justify-center items-center border-yellow-500 rounded-full w-7 h-7">
                        <Checkbox
                          id="qarz"
                          className="text-white w-5 h-5 rounded-full border-transparent data-[state=checked]:bg-yellow-500"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(!!checked);
                            setOpen(!!checked);
                          }}
                        />
                      </span>
                      <Label htmlFor="qarz" className="text-white text-lg">
                        Qarz
                      </Label>
                    </div>
                  )}

                  {/* Qo'shish faqat qarzsiz bo'lsa ishlaydi */}
                  {!isDebt && (
                    <Button
                      type="button"
                      className="bg-[#FFCC15] text-blue-950 text-sm font-bold px-6 py-1 ml-auto"
                      onClick={handleSubmit((data) => onSubmit(data, "add"))}
                    >
                      Qo'shish
                    </Button>
                  )}
                </div>
              )}
            />
          </>
        )}

        {/* Drawer */}
        <Drawer
          open={open}
          onOpenChange={(state) => {
            setOpen(state);
            if (!state) setValue("isDebt", false);
          }}
        >
          <DrawerContent className="bg-blue-950 rounded-t-2xl border-2 border-yellow-500">
            <div className="h-full px-3 py-4">
              <div className="flex flex-col gap-y-3 relative">
                {/* paidAmount */}
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="paidAmount" className="text-yellow-400">
                    Olingan pul
                  </label>
                  <Controller
                    name="paidAmount"
                    control={control}
                    rules={{ required: true, min: 1 }}
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          placeholder="Olingan pul"
                          value={(field.value ?? 0).toLocaleString()}
                          onChange={(e) => {
                            const val = Number(
                              e.target.value.replace(/[^\d]/g, "")
                            );
                            setValue("paidAmount", isNaN(val) ? 0 : val);
                          }}
                          type="text"
                          className="bg-white appearance-none border-yellow-500 border-2"
                          id="paidAmount"
                        />
                        {errors.paidAmount && (
                          <span className="text-red-500">
                            Qiymat 0 bo'lishi mumkin emas
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="commit" className="text-yellow-400">
                    Sababi
                  </label>
                  <Controller
                    name="commit"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <textarea
                          {...field}
                          placeholder="Olingan pul"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          className="bg-white rounded-lg border-yellow-500 border-2"
                        ></textarea>
                        {errors.commit && (
                          <span className="text-red-500">
                            This field is required
                          </span>
                        )}
                      </>
                    )}
                  />
                  {/* TextArea */}
                </div>

                <div className="flex justify-end">
                  {/* Yuborish faqat qarz bo'lsa ishlaydi */}
                  {isDebt && (
                    <Button
                      type="button"
                      className="text-blue-950 bg-yellow-500"
                      onClick={handleSubmit((data) => onSubmit(data, "submit"))}
                    >
                      Yuborish
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </form>
    </div>
  );
};
