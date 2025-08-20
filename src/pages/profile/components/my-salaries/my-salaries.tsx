/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowDown } from "@/icons";
import { useState } from "react";

export const MySalaries = () => {
  const [open, setOpen] = useState(false);

  // ✅ Fake user (API o‘rniga)
  const user = {
    _id: "user-123",
    fullName: "Sardor Web",
  };

  // ✅ Fake expenses (API o‘rniga)
  const expenses = [
    {
      receiver: { _id: "user-123" },
      amount: 150000,
      reason: null,
      updatedAt: "2025-08-10T10:20:30.000Z",
    },
    {
      receiver: { _id: "user-123" },
      amount: 50000,
      reason: null,
      updatedAt: "2025-08-12T14:45:10.000Z",
    },
  ];

  // ✅ Fake salaries (API o‘rniga)
  const MySalaries = [
    { amount: 300000, createdAt: "2025-08-01T09:15:00.000Z" },
    { amount: 200000, createdAt: "2025-08-05T11:30:00.000Z" },
  ];

  // ✅ Hisob-kitoblar
  const totalExpenses =
    expenses
      ?.filter((item) => item?.receiver?._id === user?._id && !item.reason)
      ?.reduce((acc, curr) => acc + (curr.amount || 0), 0) || 0;

  const totalSalaries =
    MySalaries?.reduce(
      (acc: number, item: any) => acc + (item.amount || 0),
      0
    ) || 0;

  const balance = totalSalaries - totalExpenses;

  const total = expenses?.filter(
    (item) => item?.receiver?._id === user?._id && !item.reason
  );

  return (
    <div className="mt-7">
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setOpen(value === "item-1")}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl px-2 py-1 text-[#1b2b56] font-semibold font-['Inter'] leading-[31.20px] bg-white rounded-lg border border-[#ffcb15]">
            Maoshlarim
            <Button
              aria-label="Toggle"
              className="bg-[#1C2C57]"
              onClick={() => setOpen(!open)}
            >
              <ArrowDown
                className={`transition-transform text-[#FFCC15] ${
                  open ? "rotate-0" : "rotate-180"
                }`}
              />
            </Button>
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              <div className="flex justify-between items-center px-7">
                <h4 className="text-[#ffcb15] text-sm font-medium">
                  Olingan puli
                </h4>
                <h4 className="text-[#ffcb15] text-sm font-medium">Sana</h4>
              </div>
              <div className="border-2 border-[#FFCC15] rounded-lg bg-white mt-2">
                {/* Balans */}
                <div className="flex justify-around my-2 border-b-[2px] border-[#ffcb15] pb-1.5">
                  <h5 className="text-[#1b2b56] text-base font-semibold">
                    Balans: {balance} so'm
                  </h5>
                  <h5 className="text-[#1b2b56] text-base font-semibold">—</h5>
                </div>

                {/* Xarajatlar */}
                {total?.map((item, index, array) => (
                  <div
                    key={index}
                    className={`flex justify-around my-2 ${
                      index !== array.length - 1
                        ? "border-b-[2px] border-[#ffcb15] pb-1.5"
                        : ""
                    }`}
                  >
                    <h5 className="text-[#1b2b56] text-base font-semibold">
                      {item.amount}
                    </h5>
                    <h5 className="text-[#1b2b56] text-base font-semibold">
                      {item.updatedAt.slice(0, 10)}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
