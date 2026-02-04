import {
  useGetDoughByIdQuery,
  useUpdateDoughAmountMutation,
} from "@/app/api/balance";
import type { Dough } from "@/app/api/balance/type";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const DoughDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const title = location.state?.title || "No title";

  const { data, isLoading, error } = useGetDoughByIdQuery(id || "");
  const [updateDoughAmount, { isLoading: isUpdating }] =
    useUpdateDoughAmountMutation();

  const [doughList, setDoughList] = useState<Dough[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // ❗ faqat o'zgargan itemni saqlash uchun
  const [changedDough, setChangedDough] = useState<Dough | null>(null);

  useEffect(() => {
    if (data) {
      const withAmount = data.map((d: Dough) => ({
        ...d,
        amount: d.amount || 0,
      }));
      setDoughList(withAmount);
    }
  }, [data]);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik bor</p>;

  // Plus/minus update + changedDough ni belgilash
  const handleChange = (doughType: string, type: "inc" | "dec") => {
    setDoughList((prev) =>
      prev.map((d) => {
        if (d.doughType === doughType) {
          const newAmount =
            type === "inc" ? d.amount + 1 : d.amount > 0 ? d.amount - 1 : 0;
          const updated = { ...d, amount: newAmount };
          setChangedDough(updated); // ❗ o'zgarganini belgilash
          return updated;
        }
        return d;
      }),
    );
  };

  // Faqat changedDough ni patch qilish
  const handleContinue = async () => {
    if (!changedDough) {
      setErrorMsg("❌ Hech narsa o‘zgarmagan!");
      return;
    }
    if (changedDough.amount > changedDough.limitDoughCount) {
      setErrorMsg(
        `❌ ${changedDough.doughTitle} uchun miqdor limitdan oshib ketgan!`,
      );
      return;
    }
    try {
      await updateDoughAmount({
        id,
        doughs: [
          {
            ...changedDough,
          },
        ],
      }).unwrap();

      toast.success("Xamir miqdori muvaffaqiyatli yangilandi!");
      setErrorMsg("");
      navigate("/balance");
    } catch (err) {
      console.error("❌ Error updating:", err);
      toast.error("Saqlashda xatolik yuz berdi!");
      setErrorMsg("❌ Saqlashda xatolik bo‘ldi!");
    }
  };

  return (
    <div className="bg-[#13255c] flex flex-col min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#13255c] fixed top-0 w-full p-6 z-10">
        <div className="flex items-center">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/balance");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="28" height="28" rx="14" fill="#FFCC15" />
              <path
                d="M20.6667 14H7.33337M7.33337 14L12.3334 9M7.33337 14L12.3334 19"
                stroke="#111E2B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="text-[24px] font-semibold text-white ml-10">{title}</p>
        </div>
      </div>

      {/* Dough list */}
      <div className="w-full pt-12 px-5 flex flex-col gap-4 mt-20">
        {doughList.map((dough) => (
          <div
            key={dough.doughType}
            className="rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold"
          >
            <h1>{dough.doughTitle}</h1>
            <p className="text-[#13255c]">Limit: {dough.limitDoughCount}</p>

            <div className="flex items-center gap-x-4">
              {/* Minus */}
              <span onClick={() => handleChange(dough.doughType, "dec")}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="8" fill="#1C2C57" />
                  <path
                    d="M6 10H14"
                    stroke="#FFCC15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Text */}
              <h1
                className={`text-center w-16 font-bold ${
                  dough.amount > dough.limitDoughCount
                    ? "text-red-500"
                    : "text-[#13255c]"
                }`}
              >
                {dough.amount}
              </h1>

              {/* Plus */}
              <span onClick={() => handleChange(dough.doughType, "inc")}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="8" fill="#1C2C57" />
                  <path
                    d="M10 5.33398V14.6673M5.33337 10.0007H14.6667"
                    stroke="#FFCC15"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-red-500 text-center mt-4 font-semibold">
          {errorMsg}
        </p>
      )}

      {/* Continue */}
      <div className="mt-8 mr-5 ml-auto">
        <Button
          variant={"bakery"}
          onClick={handleContinue}
          disabled={isUpdating}
        >
          {isUpdating ? "Saqlanmoqda..." : "Davom etish"}
        </Button>
      </div>
    </div>
  );
};

// import { useState } from "react";
// import { Button } from "@/components";
// import { ArrowLeft, Notifications, Plus } from "@/icons";
// import { useNavigate } from "react-router-dom";

// export const DoughDetails = () => {
//     const navigate = useNavigate();
//     const [count, setCount] = useState(3);

//     const handleIncrement = () => {
//         setCount(prev => prev + 1);
//     };

//     const handleDecrement = () => {
//         setCount(prev => (prev > 0 ? prev - 1 : 0));
//     };

//     return (
//         <div>
//             <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
//                 <div className="flex w-[95%] m-auto justify-between items-center">
//                     <div className="flex gap-x-2 items-center">
//                         <Button
//                             onClick={() => navigate("/balance")}
//                             className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
//                         >
//                             <ArrowLeft className="text-2xl" />
//                         </Button>
//                     </div>
//                     <h2 className="text-white text-xl font-semibold font-inter">Bochkadan</h2>
//                     <button onClick={() => navigate("/notifications")}>
//                         <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
//                     </button>
//                 </div>
//             </div>
//             <div className="px-3 space-y-4">
//                 <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden mt-[100px] flex items-center px-4 justify-between">
//                     <div className="text-blue-950 text-sm font-bold">Chig’atoy</div>
//                     <p className="text-blue-950 text-sm font-bold">3</p>
//                     <div className="flex items-center gap-3">
//                         <button
//                             onClick={handleDecrement}
//                             className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
//                         >
//                             -
//                         </button>
//                         <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
//                         <button
//                             onClick={handleIncrement}
//                             className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
//                         >
//                             <Plus className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="w-full h-12 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 overflow-hidden flex items-center px-4 justify-between">
//                     <div className="text-blue-950 text-sm font-bold">Patir</div>
//                     <p className="text-blue-950 text-sm font-bold">2</p>
//                     <div className="flex items-center gap-3">
//                         <button
//                             onClick={handleDecrement}
//                             className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
//                         >
//                             -
//                         </button>
//                         <span className="text-blue-950 text-sm font-bold w-6 text-center">{count}</span>
//                         <button
//                             onClick={handleIncrement}
//                             className="w-8 h-8 flex justify-center items-center bg-blue-950 rounded-full text-yellow-400 transition"
//                         >
//                             <Plus className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="flex justify-end">
//                     <Button className="w-36 h-7 p-3 bg-stone-300 rounded-lg  inline-flex justify-center items-center gap-1 text-[#1B2B56] hover:bg-stone-300">Davom etish</Button>
//                 </div>
//             </div>
//         </div>
//     );
// };
