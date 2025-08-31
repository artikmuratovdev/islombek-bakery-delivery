import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentDrawer } from "./components";
import { Button } from "@/components";
import { useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { LeafletMap } from "../../components/common/leaflet-map/leaflet-map";
import toast from "react-hot-toast";
import { BottomSheet } from "@/components/common";

export const Order = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [latlng, setLatLng] = useState("");

  const { id } = useParams();

  // ✅ Fake order (API o‘rniga)
  const debtor = {
    _id: id,
    createdAt: new Date().toISOString(),
    amount: "250,000 so'm",
    location: "Toshkent, Chilonzor",
    customer: {
      _id: "cust-123",
      fullName: "Sardor Web",
    },
  };

  // ✅ Manzilni saqlash (faqat toast bilan ishlaydi)
  const handleSaveLocation = async () => {
    if (!latlng) return;
    toast.success("Mijoz manzili saqlandi! (static)");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleRefresh = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("Yangilandi (static)");
        resolve(true);
      }, 1000);
    });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div>
        {/* Header */}
        <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-50">
          <div className="flex w-[95%] m-auto justify-between items-center">
            <Button
              onClick={() => navigate('/orders',{state:'activeOrder'})}
              className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
            >
              <ArrowLeft className="text-2xl" />
            </Button>
            <h3 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
              Zakaslar
            </h3>
            <button onClick={() => navigate("/notifications")}>
              <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10 pt-[90px]">
          {/* Map */}
          <div>
            <LeafletMap
              setLocation={(location) => {
                setLatLng(`${location.lat},${location.lng}`);
              }}
            />
          </div>

          {/* Order Info */}
          <div className="w-full p-3 mt-5 z-40">
            <div className="flex justify-between text-center px-3 py-3 bg-white font-bold text-[#1C2C57] rounded-lg border border-[#FFCC15]">
              <span className="text-[#1b2b56] text-[15px] font-bold font-inter">
                {formatTime(debtor.createdAt)}
              </span>
              <span className="text-[#1b2b56] text-[15px] font-bold font-inter">
                {debtor.amount}
              </span>
              <span className="text-[#1b2b56] text-[15px] font-bold font-inter">
                {debtor.customer?.fullName || debtor.location}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between w-full gap-5">
              <Button
                onClick={handleSaveLocation}
                disabled={!latlng}
                className="w-1/2 bg-[#FFCC15] text-[#1C2C57] hover:text-white font-semibold mt-[20px]"
              >
                Manzilni saqlash
              </Button>
              <Button
                onClick={() => setOpen(true)}
                className="w-1/2 bg-[#FFCC15] text-[#1C2C57] hover:text-white font-semibold mt-[20px]"
              >
                To'lov kiritish
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Drawer */}
        <BottomSheet open={open} setOpen={setOpen} className="bg-[#1b2b56]">
          <PaymentDrawer />
        </BottomSheet>
      </div>
    </PullToRefresh>
  );
};
