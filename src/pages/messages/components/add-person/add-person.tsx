import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components";

const users = [
  { _id: "1", fullName: "Ali Vali" },
  { _id: "2", fullName: "Sara Otabek" },
  { _id: "3", fullName: "Jasur Mirza" },
];

export const AddPerson = () => {
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedUserId(value);
  };

  const handleButtonClick = () => {
    if (selectedUserId) {
      alert(`Tanlangan foydalanuvchi: ${selectedUserId}`);
    }
  };

  return (
    <div className="h-[200px]">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]">
          <SelectValue placeholder="Xodimni tanglang" />
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
      <div className="flex justify-end mt-[35px]">
        <Button
          onClick={handleButtonClick}
          className="py-[3px] bg-[#ffcb15] rounded-lg text-[#1b2b56] hover:text-white justify-center items-center"
        >
          Kiritish
        </Button>
      </div>
    </div>
  );
};
