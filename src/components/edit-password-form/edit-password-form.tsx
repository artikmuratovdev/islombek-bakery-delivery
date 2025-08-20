import { BottomSheet } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { Button } from "../ui";
import { Password } from "@/icons";
import { useUpdatePasswordMutation } from "@/app/api";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export const EditPasswordForm = () => {
  const [open, setOpen] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRequest = useHandleRequest();

  const onSubmit: SubmitHandler<FieldValues> = async (formValues) => {
    await handleRequest({
      request: async () => {
        const result = await updatePassword({
          oldPassword: formValues.oldPassword,
          newPassword: formValues.newPassword,
          confirmPassword: formValues.confirmPassword,
        }).unwrap();
        return result;
      },
      onSuccess: () => {
        setOpen(false);
        reset();
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(
          "Xatolik yuz berdi. Iltimos, qayta urinib ko’ring." + error
        );
      },
    });
  };

  const inputClass =
    "w-full font-semibold bg-white rounded-lg border border-[#ffcb15] pr-10";

  const iconStyle = "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer";

  return (
    <>
      <div
        className="bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Password className="text-[#1b2b56]" />
        <h4 className="text-center text-[#1b2b56] text-sm font-black">
          Profile parolini o’zgartirish
        </h4>
      </div>
      <BottomSheet open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="w-full py-10 space-y-4">
            {/* Eski parol */}
            <Label htmlFor="oldPassword" className="text-right text-[#ffcb15]">
              Eski parol
            </Label>
            <Controller
              name="oldPassword"
              control={control}
              rules={{ required: "Eski parolni kiriting" }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    type={showOld ? "text" : "password"}
                    className={inputClass}
                    placeholder="Eski parolni kiriting"
                    {...field}
                  />
                  {showOld ? (
                    <EyeOff
                      className={iconStyle}
                      onClick={() => setShowOld(false)}
                    />
                  ) : (
                    <Eye
                      className={iconStyle}
                      onClick={() => setShowOld(true)}
                    />
                  )}
                  <p className="text-red-600 text-sm mt-1">
                    {errors.oldPassword?.message as string}
                  </p>
                </div>
              )}
            />

            {/* Yangi parol */}
            <Label htmlFor="newPassword" className="text-right text-[#ffcb15]">
              Yangi parol
            </Label>
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: "Yangi parolni kiriting" }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    className={inputClass}
                    placeholder="Yangi parolni kiriting"
                    {...field}
                  />
                  {showNew ? (
                    <EyeOff
                      className={iconStyle}
                      onClick={() => setShowNew(false)}
                    />
                  ) : (
                    <Eye
                      className={iconStyle}
                      onClick={() => setShowNew(true)}
                    />
                  )}
                  <p className="text-red-600 text-sm mt-1">
                    {errors.newPassword?.message as string}
                  </p>
                </div>
              )}
            />

            {/* Tasdiqlash */}
            <Label
              htmlFor="confirmPassword"
              className="text-right text-[#ffcb15]"
            >
              Yangi parolni tasdiqlash
            </Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Parolni tasdiqlash kerak" }}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    className={inputClass}
                    placeholder="Yangi parolni tasdiqlang"
                    {...field}
                  />
                  {showConfirm ? (
                    <EyeOff
                      className={iconStyle}
                      onClick={() => setShowConfirm(false)}
                    />
                  ) : (
                    <Eye
                      className={iconStyle}
                      onClick={() => setShowConfirm(true)}
                    />
                  )}
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword?.message as string}
                  </p>
                </div>
              )}
            />

            <Button
              type="submit"
              className="mt-6 w-full py-[3px] bg-[#ffcb15] rounded-lg text-[#1b2b56] hover:text-white justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "Yuborish"}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  );
};
