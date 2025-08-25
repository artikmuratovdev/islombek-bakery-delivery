import { Button } from "@/components";
import { ArrowLeft } from "@/icons";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      _id: "1",
      type: "ORDER",
      status: "PENDING",
      order: {
        _id: "101",
        amount: 25,
        status: "PENDING",
        customer: { fullName: "Ali Valiyev" },
        location: "Chilonzor",
      },
      from: { fullName: "Operator", createdAt: new Date().toISOString() },
    },
    {
      _id: "2",
      type: "EXPENSE",
      status: "ACCEPTED",
      expense: { amount: 150000 },
      from: { fullName: "Admin", createdAt: new Date().toISOString() },
    },
  ];

  const visibleNotifications = notifications.filter(
    (item) => item.status !== "REJECTED"
  );

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <div className="flex gap-x-[30px] items-center">
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
            <div className="text-center text-white text-2xl font-semibold font-inter ml-[44px] leading-[31.20px]">
              Bildirishnoma
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 w-[95%] m-auto p-[12px] flex flex-col gap-y-5 mb-20">
        {visibleNotifications.length === 0 ? (
          <div className="text-white text-center text-xl font-medium mt-10">
            Bildirishnoma mavjud emas
          </div>
        ) : (
          visibleNotifications.map((item) => (
            <div
              key={item._id}
              className="bg-white/0 rounded-xl border-2 border-[#ffcb15] p-5"
            >
              <h4 className=" text-white text-xl font-semibold mb-3">
                {item.type === "ORDER"
                  ? "Manzil: " +
                    (item.order?.customer?.fullName || item.order?.location)
                  : "Xarajat: " + item.from?.fullName}
              </h4>
              <div className="flex justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <Calendar className="text-[#FFCC15] w-6 h-6" />
                  <h4 className="text-center text-white text-[14px] font-normal">
                    {new Date(item.from?.createdAt).toLocaleDateString("uz-UZ")}
                  </h4>
                </div>
                <div className="flex gap-x-3 items-center">
                  <Clock className="text-[#FFCC15] w-6 h-6" />
                  <h4 className="text-center text-white text-[14px] font-normal">
                    {new Date(item.from?.createdAt).toLocaleTimeString("uz-UZ")}
                  </h4>
                </div>
                <div className=" text-white text-[15px] font-medium">
                  {item.type === "ORDER"
                    ? item.order?.amount + " ta non"
                    : item.expense?.amount + " so'm"}
                </div>
              </div>
              {item.status === "PENDING" && (
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-[red] text-white text-[15px] font-medium leading-tight">
                    Bekor qilish
                  </Button>
                  <Button className="bg-[green] text-white text-[15px] font-medium leading-tight">
                    Qabul qilish
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
