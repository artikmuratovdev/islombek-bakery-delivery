import { Button } from "@/components"
import { ArrowLeft, Notifications } from "@/icons"
import { useNavigate } from "react-router-dom";

export const OrderMap = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-2xl">
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
        <div className="flex w-[95%] m-auto justify-between items-center">
          <Button
            onClick={() => navigate("/orders")}
            className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h3 className="text-white text-2xl font-semibold">
            Zakazlar
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[23%]">
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.700525733367!2d67.02991307632635!3d37.65624411897838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f355f135de70163%3A0x753f2c48a26df1ec!2sSherobod%20tumani%20axborot%20kutubxona%20markazi!5e0!3m2!1sen!2s!4v1732282731913!5m2!1sen!2s"
            width="100%"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: "0px" }}
          ></iframe>
        </div>
        <div className="px-4">
          <div className="w-full h-24 bg-white rounded-lg border border-yellow-400 mt-2 space-y-2">
            <div className="w-full flex justify-between px-4 items-center mt-3">
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">00:30:45</h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">Fresh market</h2>
            </div>
            <div className="w-full flex justify-between px-4 items-center">
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">77 543 57 86</h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">Yess Boss ro'parasi</h2>
            </div>
            <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight text-center">Soat 4 da issiq non olib bor.</h2>
          </div>
          <div className="w-full h-24 bg-white rounded-lg border border-yellow-400 mt-2 space-y-3">
            <div className="flex justify-between px-4 items-center mt-3">
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Chig’atoy</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">500</h2>
            </div>
            <div className="flex justify-between px-4 items-center">
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Buxonka</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">200</h2>
            </div>
            <div className="flex justify-between px-4 items-center">
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">Patir</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">5 000</h2>
              <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight">50</h2>
            </div>
          </div>
          <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-2">Umumiy summa: 800 000</h1>
          <div className="flex justify-end">
            <Button className="w-40 h-8 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-center items-center gap-3 text-[#1B2B56] hover:bg-yellow-400 mt-5">Qabul qilish</Button>
          </div>
        </div>
      </div>
    </div>
  )
}