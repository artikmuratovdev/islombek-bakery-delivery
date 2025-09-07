/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteDriverSavdoMutation,
  useLazyGetDriverSavdoAllSavdoQuery,
} from "@/app/api/dastavchik-savdo-api";
import { Button } from "@/components";
import { UZBTime } from "@/components/common/uzb-time";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHandleRequest } from "@/hooks";
import { ArrowLeft, Delete, Edit, Notifications, Third } from "@/icons";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Trade = () => {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [openId, setOpenId] = useState(null);
  const [getDriverSavdoAllSavdo, { data: savdo, isLoading, isFetching }] =
    useLazyGetDriverSavdoAllSavdoQuery();

  const [deleteDriverSavdo] = useDeleteDriverSavdoMutation();

  const handleRequest = useHandleRequest();

  useEffect(() => {
    getDriverSavdoAllSavdo({
      endDate: new Date().toISOString().split("T")[0],
      startDate: new Date().toISOString().split("T")[0],
    });
  }, []);

  const openDeleteDialog = (id: string) => {
    const randomCode = generateRandomCode(5);
    setVerificationCode(randomCode);
    setDeleteId(id);
    setInputValue("");
    setDeleteOpen(true);
  };

  const generateRandomCode = (length: number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleDelete = async () => {
    await handleRequest({
      request: () => deleteDriverSavdo({ id: deleteId as string }).unwrap(),
      onSuccess: () => {
        setDeleteOpen(false);
        getDriverSavdoAllSavdo({
          endDate: new Date().toISOString().split("T")[0],
          startDate: new Date().toISOString().split("T")[0],
        });
      },
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div
            className="flex gap-x-2 items-center"
            onClick={() => navigate("/balance")}
          >
            <Button
              onClick={() => navigate("/balance")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
          </div>
          <h2 className="text-white text-xl font-semibold font-inter">Savdo</h2>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <div className="mt-[23%] w-[100%] flex justify-end px-6">
        <UZBTime
          fetchDate
          onSelectDate={(e) => {
            getDriverSavdoAllSavdo({
              endDate: e.endDate,
              startDate: e.startDate,
            });
          }}
        />
      </div>

      {/* Savdo List */}
      <div className="px-6 my-5 space-y-5">
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center h-32">
            <Loader className="animate-spin text-blue-500 w-6 h-6" />
          </div>
        ) : savdo && savdo.length > 0 ? (
          savdo.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/trade/${item._id}`)}
              className={`w-full h-10 relative rounded-lg outline outline-1 outline-offset-[-1px] overflow-hidden flex justify-between items-center px-6 
                ${
                  item?.approval === "PENDING"
                    ? "bg-yellow-400"
                    : item?.approval === "REJECTED"
                    ? "bg-red-600"
                    : "bg-white"
                } 
                ${
                  item?.approval === "PENDING"
                    ? "outline-yellow-700"
                    : item?.approval === "REJECTED"
                    ? "outline-red-700"
                    : "outline-gray-300"
                }
              `}
            >
              <h2
                className={`text-sm font-bold 
                  ${
                    item?.approval === "ACCEPTED"
                      ? "text-green-500"
                      : "text-white"
                  }
                `}
              >
                {item?.totalAmount}
              </h2>
              <h2
                className={`text-sm font-bold
                  ${
                    item?.approval === "ACCEPTED"
                      ? "text-blue-950"
                      : "text-white"
                  }
                `}
              >
                {item.createdAt.slice(11, 16)}
              </h2>
              {item?.address && (
                <h2 className="text-sm font-bold text-blue-950">
                  {item?.address}
                </h2>
              )}

              <DropdownMenu
                open={openId === item._id}
                onOpenChange={(isOpen) =>
                  setOpenId(isOpen ? item._id : (null as any))
                }
              >
                <DropdownMenuTrigger asChild>
                  <button onClick={(e) => e.stopPropagation()}>
                    <Third
                      fill={
                        item?.approval === "ACCEPTED" ? "blue-950" : "white"
                      }
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuCheckboxItem
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trade/${item._id}/edit`);
                    }}
                    className="text-blue-950 text-sm font-semibold flex justify-start gap-x-2"
                  >
                    <Edit className="ml-[-20px]" /> Tahrirlash
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteDialog(item._id);
                    }}
                    className="text-red-700 text-sm font-semibold flex justify-start gap-x-2"
                  >
                    <Delete className="ml-[-20px]" /> O'chirish
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 font-semibold text-lg py-10">
            Hozircha ma'lumot yo'q
          </div>
        )}
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'chirishni tasdiqlang</AlertDialogTitle>
            <AlertDialogDescription>
              Ushbu savdo yozuvini o‘chirib tashlamoqchimisiz? Qaytarib
              bo‘lmaydi. Davom etish uchun quyidagi kodni kiriting:
              <div className="mt-3 p-2 bg-gray-200 rounded text-center font-bold text-lg">
                {verificationCode}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <input
            type="text"
            placeholder="Kodni kiriting"
            className="w-full mt-3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1b2b56]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
          />
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-gray-200 text-black">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              className={`bg-[#1b2b56] text-white ${
                inputValue !== verificationCode
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={inputValue !== verificationCode}
              onClick={handleDelete}
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
