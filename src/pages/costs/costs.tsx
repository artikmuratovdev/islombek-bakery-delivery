import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Edit, Menu, Notifications, Trash } from "@/icons";
import { BottomSheet } from "@/components/common";
import { CostsDrawer, EditDrawer } from "./components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

interface Expense {
  _id: string;
  reason: { content: string };
  amount: number;
  user: { _id: string; fullName: string };
}

export const Costs = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // 🔹 Static user
  const user = { _id: "u1", fullName: "Ali Valiyev" };

  // 🔹 Static expenses
  const expenses = [
    { _id: "e1", reason: { content: "Benzin" }, amount: 50000, user },
    { _id: "e2", reason: { content: "Tamirlash" }, amount: 30000, user },
    {
      _id: "e3",
      reason: { content: "Ofis xarajat" },
      amount: 20000,
      user: { _id: "u2", fullName: "Bekzod" },
    },
  ];

  const expenseFilter = expenses.filter((expense) =>
    [expense?.user?._id].includes(user._id),
  );

  const totalExpenses =
    expenseFilter?.reduce((acc, expense) => acc + expense.amount, 0) || 0;

  const handleDeleteExpense = (expense: Expense) => {
    toast.success(`Xarajat muvaffaqiyatli o'chirildi: ${expense.amount}`, {
      duration: 2000,
    });
  };

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-5 fixed top-0 w-full">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 flex justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white rounded-full"
          >
            <ArrowLeft className="text-2xl hover:text-[#FFCC15]" />
          </button>
          <h3 className="text-white text-2xl font-semibold text-center">
            Xarajatlar
            <span className="block text-lg">
              {totalExpenses.toLocaleString()} so'm
            </span>
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 mt-[100px]">
        <button
          className="w-full bg-white rounded-lg border border-[#ffcb15] text-[#1b2b56] font-semibold flex justify-center items-center py-2"
          onClick={() => setOpen(true)}
        >
          Xarajat kiritish
        </button>

        <div className="mt-7 space-y-4">
          {expenseFilter?.map((expense) => (
            <div
              key={expense._id}
              className="w-full bg-white rounded-lg shadow-md border border-[#ffcb15] flex justify-between p-3 font-semibold"
            >
              <p className="text-[#1b2b56]">
                {expense?.reason?.content || expense?.user?.fullName}
              </p>
              <div className="flex gap-x-5 items-center">
                <p className="text-[#1b2b56]">
                  {expense?.amount.toLocaleString("ru-RU")}
                </p>
                {expense.user._id === user._id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <Menu className="cursor-pointer w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex gap-x-2 items-center"
                        onClick={() => {
                          setIsEditOpen(!isEditOpen);
                          setSelectedExpense(expense);
                        }}
                      >
                        <Edit className="w-4 h-4 text-[#1b2b56]" />
                        <p className="text-[#1b2b56] text-sm font-semibold">
                          Tahrirlash
                        </p>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex gap-x-2 items-center text-[#C71A1A]"
                        onClick={() => handleDeleteExpense(expense)}
                      >
                        <Trash className="w-4 h-4" />
                        <p className="text-sm font-semibold">O’chirish</p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomSheet
        children={<CostsDrawer setOpen={setOpen} />}
        open={open}
        setOpen={setOpen}
      />

      <BottomSheet
        children={
          <EditDrawer setOpen={setIsEditOpen} expense={selectedExpense} />
        }
        open={isEditOpen}
        setOpen={setIsEditOpen}
      />
    </div>
  );
};
