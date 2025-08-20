import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";

interface SelectProps {
  className?: string;
  title?: string;
  setId: (id: string) => void;
}

export const SelectReasons: FC<SelectProps> = ({
  className,
  setId,
  title = "Chat qo'shish",
}) => {
  // 🔹 Static reasons
  const getReasons = [
    { _id: "r1", content: "Texnik sabab" },
    { _id: "r2", content: "Moliyaviy sabab" },
    { _id: "r3", content: "Shaxsiy sabab" },
  ];

  const [selected, setSelected] = useState("");

  const handleChange = (id: string) => {
    setSelected(id);
    setId(id);
  };

  return (
    <Select
      aria-label="Select Reason"
      onValueChange={(value) => handleChange(value)}
      value={selected}
    >
      <SelectTrigger
        aria-haspopup="listbox"
        aria-expanded={!!selected}
        aria-labelledby="select-label"
        className={cn("w-full", className)}
      >
        <SelectValue id="select-label" placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup role="group">
          {getReasons.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
              onClick={() => handleChange(item._id)}
              className="text-[#1C2C57] text-[16px] font-semibold line-clamp-1"
              role="option"
            >
              {item.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
