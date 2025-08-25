import { Button } from "@/components";
import { UZBTime } from "@/components/common/uzb-time";
import { format } from "date-fns";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetBakeryDeliveryQuery } from "@/app/api";

export const Delivery = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: deliverys } = useGetBakeryDeliveryQuery({ id });

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
            Yetkazib beruvchi
          </h3>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[25%] px-6">
        <div className="w-full flex justify-end mb-4">
          <UZBTime />
        </div>
        <div className="space-y-5 mt-10">
          {deliverys ? (
            deliverys && deliverys.length > 0 ? (
              deliverys.map((delivery) => (
                <Accordion
                  key={delivery._id}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="bg-white border border-yellow-400 rounded-lg px-4 py-2 flex justify-between items-center no-underline hover:no-underline">
                      <p className="text-blue-950 text-base font-semibold w-3/5">
                        {delivery.driverFullName}
                      </p>
                      <p className="text-blue-950 text-base font-semibold w-2/5">
                        {delivery.breads.reduce(
                          (acc, cur) => (acc += cur.count),
                          0
                        )}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="w-10/12 mx-auto bg-white mt-2 rounded-xl border border-yellow-400 shadow-md">
                      <table className="text-sm text-blue-950 font-semibold text-center border-collapse w-full">
                        <thead className="border-b border-yellow-400">
                          <tr>
                            <th className="py-2">Soni</th>
                            <th className="py-2">Vaqti</th>
                          </tr>
                        </thead>
                        <tbody>
                          {delivery.breads.map((item, idx) => (
                            <tr
                              key={item.date + item.count + idx}
                              className="border-b border-yellow-400"
                            >
                              <td className="py-2">{item.count}</td>
                              <td className="py-2">
                                {format(item.date, "HH-mm")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))
            ) : (
              <p className="text-white font-[600] text-[18px] text-center">
                Yetkazuvchilar mavjud emas
              </p>
            )
          ) : (
            <p className="text-white font-[600] text-[18px] text-center">
              Loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
