import { Button } from "@/components";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextArea } from "@/components/common";

export const SentMessage = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) => {
  const form = useForm();

  // 🔹 Static users (mock data)
  const users = [
    { _id: "1", fullName: "Ali Valiyev" },
    { _id: "2", fullName: "Dilnoza Karimova" },
    { _id: "3", fullName: "Sherzod Qodirov" },
  ];

  const onSubmit = (data: any) => {
    console.log("Form ma'lumotlari:", data);
    alert("Shikoyat yuborildi ✅");
    form.reset({
      to: "",
      content: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3"
      >
        <Controller
          name="to"
          control={form.control}
          rules={{ required: "Xodimni tanlang" }}
          render={({ field }) => (
            <>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]">
                  <SelectValue placeholder="Xodimni tanlang" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg border border-[#ffcb15] mt-[9px]">
                  {users.map((item) => (
                    <SelectItem
                      key={item._id}
                      value={item._id}
                      className="text-[#1b2b56] text-base font-semibold font-inter bg-white rounded-lg border border-[#ffcb15] mt-[9px] flex items-center gap-x-12"
                    >
                      {item.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-red-600">
                {typeof form.formState.errors.to?.message === "string" &&
                  form.formState.errors.to.message}
              </p>
            </>
          )}
        />

        <Controller
          name="content"
          rules={{ required: "Shikoyatni kiriting!" }}
          control={form.control}
          render={({ field }) => (
            <>
              <TextArea
                placeholder="Shikoyatni yozing!"
                className="bg-white rounded-lg"
                {...field}
              />
              <p className="text-xs text-red-600">
                {typeof form.formState.errors.content?.message === "string" &&
                  form.formState.errors.content.message}
              </p>
            </>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className=" bg-[#ffcb15] rounded-lg text-[#1b2b56] text-base font-semibold font-inter hover:bg-[#ffcb15] mt-[7px]"
          >
            Yuborish
          </Button>
        </div>
      </form>
    </div>
  );
};
