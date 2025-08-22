import { useGetAllBakeryQuery } from "@/app/api";
import { Button } from "@/components";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";

export const Bakerys = () => {
  const navigate = useNavigate();
  const { data: bakerys } = useGetAllBakeryQuery({});

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-white text-2xl font-semibold">Nonvoyxona</h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-32 px-4 space-y-5">
        {bakerys ? (
          bakerys && bakerys.length > 0 ? (
            bakerys.map((bakery) => (
              <div
                key={bakery._id}
                className="w-full h-28 bg-white rounded-lg shadow-[5px_5px_8px_0px_rgba(55,48,121,0.60)] border-2 border-yellow-400 flex items-center gap-x-5 px-5"
                onClick={() => navigate(`bakery/${bakery._id}`)}
              >
                <img
                  className="w-16 h-16 rounded-[360px] border border-slate-200"
                  src="https://placehold.co/69x68"
                />
                <div className="w-40">
                  <h2 className="text-blue-950 text-2xl font-bold font-['Inter']">
                    {bakery.title}
                  </h2>
                  <span className="text-blue-950 text-2xl font-extrabold font-['Inter']">
                    {bakery.breadsCount}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white font-[600] text-[18px] text-center">
              Nonvoyxona mavjud emas
            </p>
          )
        ) : (
          <p className="text-white font-[600] text-[18px] text-center">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};
