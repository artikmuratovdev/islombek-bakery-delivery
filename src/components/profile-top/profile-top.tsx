import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera } from "@/icons";
import { useState } from "react";
import { Button } from "../ui";
import { BottomSheet } from "../common";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ProfileTop = () => {
  const [open, setOpen] = useState(false);

  // Static user (API o‘rniga)
  const [user, setUser] = useState({
    _id: "12345",
    fullName: "Sardor Web",
    avatar: "https://via.placeholder.com/150",
  });

  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const navigate = useNavigate();

  const { control, handleSubmit, formState, reset } = useForm();

  // File yuklash (faqat local preview)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file); // faqat preview uchun
    setAvatarUrl(imageUrl);

    toast.success("Avatar muvaffaqiyatli yangilandi (static)");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formValues) => {
    setUser((prev) => ({ ...prev, fullName: formValues.fullName }));
    toast.success("Ism muvaffaqiyatli o‘zgartirildi (static)");
    setOpen(false);
    reset();
  };

  return (
    <div className="border-b-2 border-[#FFCC15] pb-6 rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
      <Button
        onClick={() => navigate("/dashboard")}
        className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full ml-2 mb-4"
      >
        <ArrowLeft className="text-2xl" />
      </Button>
      <div className="flex w-[95%] m-auto gap-x-5 items-center">
        <div className="relative">
          <Avatar className="w-[116px] h-[116px] object-cover">
            <AvatarImage
              className="w-[116px] h-[116px] object-cover"
              src={avatarUrl}
              alt="Avatar"
            />
            <AvatarFallback>{user.fullName[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 right-1 !h-9 !w-9">
            <Label htmlFor="picture" className="w-full">
              <Camera className="!h-9 !w-9 cursor-pointer" />
            </Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <h5 className="text-center text-white text-base font-semibold leading-[31.20px]">
          {user.fullName || "Guest"}
        </h5>
      </div>
      <BottomSheet
        open={open}
        setOpen={setOpen}
        className="bg-[#1C2C57]"
        children={
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
            <div className="w-full py-10">
              <Label htmlFor="name" className="text-right text-[#ffcb15]">
                Username
              </Label>
              <Controller
                name="fullName"
                control={control}
                defaultValue={user.fullName}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Input
                    className="w-full font-semibold bg-white rounded-lg border border-[#ffcb15] flex-col justify-start items-start gap-3 inline-flex"
                    placeholder="Ism kiriting"
                    {...field}
                  />
                )}
              />
              <p className="text-sm mt-1 ml-1 text-red-600">
                {formState.errors.fullName?.message?.toString()}
              </p>

              <Button
                type="submit"
                className="mt-6 w-full py-[3px] bg-[#ffcb15] rounded-lg text-[#1b2b56] hover:text-white justify-center items-center"
              >
                Save
              </Button>
            </div>
          </form>
        }
      />
    </div>
  );
};
