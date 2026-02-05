import { useGetCustomersQuery } from "@/app/api";
import { Input } from "@/components";
import { setNumber } from "@/hooks/setNumber";
import { ArrowLeft, Notifications } from "@/icons";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Customers = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data } = useGetCustomersQuery({ client: search });

  const handleSubmit = (data: {
    _id: string;
    fullName: string;
    phone: string;
  }) => {
    navigate("customer-details/" + data._id, {
      state: { fullName: data.fullName, phone: data.phone },
    });
  };

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex w-[95%] m-auto items-center justify-between">
          <div className="w-7">
            <Link to={"/"}>
              <ArrowLeft className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer scale-125" />
            </Link>
          </div>
          <h4 className="text-center justify-center text-white text-2xl font-semibold leading-loose">
            Mijozlar
          </h4>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="my-[120px] m-auto p-[12px] space-y-5">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 
            z-10 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          />
          {search && (
            <XCircle
              onClick={() => setSearch("")}
              className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          )}
        </div>
        {data?.clients &&
          data.clients.map((client) => (
            <div
              key={client._id}
              className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center p-4"
              onClick={() => handleSubmit(client)}
            >
              <h1
                className={
                  (client.hasOrder ? "text-red-700" : "text-green-700") +
                  "  text-base font-bold leading-tight"
                }
              >
                {client.fullName}
              </h1>
              <h3 className="bg-gray-200 rounded-[10px] w-32 h-7 flex justify-center items-center">
                {client.phone && setNumber?.(client.phone)}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};
