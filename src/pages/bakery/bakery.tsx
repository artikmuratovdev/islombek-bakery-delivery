import { useGetBakeryQuery } from "@/app/api";
import { BakerRoom } from "@/app/api/bakery/type";
import { Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { formatNumberWithSpaces } from "@/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Bakery = () => {
  const navigate = useNavigate();
  const [bakerRoom, setBakerRoom] = useState<BakerRoom | undefined>();
  const { id = "" } = useParams();
  const { data: bakery } = useGetBakeryQuery({ id });

  useEffect(() => {
    if (bakery && "bakerRoom" in bakery) {
      setBakerRoom(bakery.bakerRoom);
    }
  }, [bakery]);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate(-1)}
            className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-white text-2xl font-semibold">
            {bakerRoom && bakerRoom.title}
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="mt-32 px-6">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center"
            onClick={() => navigate("dough")}
          >
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.doughsCount || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Xamir
            </h3>
          </div>
          <div className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center">
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.roundsCount || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Zuvala
            </h3>
          </div>
          <div className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center">
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.inOvenCount || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Tandirda
            </h3>
          </div>
          <div
            className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center"
            onClick={() => navigate("bread")}
          >
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.breadsCount || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Non
            </h3>
          </div>
          <div
            className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center"
            onClick={() => navigate("delivery")}
          >
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.deliveredCount || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Yetkazuvchi
            </h3>
          </div>
          <div className="w-40 h-32 relative bg-white rounded-2xl outline outline-[3px] outline-offset-[-3px] outline-yellow-400 overflow-hidden flex flex-col justify-center items-center">
            <h3 className="text-blue-950 text-3xl font-semibold font-['Inter'] leading-10">
              {formatNumberWithSpaces(bakerRoom?.soldBreadMoney || 0)}
            </h3>
            <h3 className="text-blue-950 text-xl font-extrabold font-['Inter'] leading-relaxed">
              Sotuv
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
