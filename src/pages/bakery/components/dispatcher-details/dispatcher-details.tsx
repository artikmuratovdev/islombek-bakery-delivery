import { Button } from "@/components";
import { UZBTime } from "@/components/common/uzb-time";
import { ArrowLeft, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const tableData = [
    { soni: 400, vaqti: "12:10" },
    { soni: 500, vaqti: "12:10" },
    { soni: 700, vaqti: "12:10" },
    { soni: 400, vaqti: "12:10" },
];

export const DispatcherDetails = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <Button
                        onClick={() => navigate("/bakery/bakery-details")}
                        className="w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h3 className="text-white text-2xl font-semibold">Yetkazib beruvchi</h3>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[25%] px-6">
                <div className="w-full flex justify-end mb-4">
                    <UZBTime />
                </div>
                <div className="space-y-5">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                    >
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="bg-white border border-yellow-400 rounded-lg px-4 py-2 flex justify-between items-center no-underline">
                                <p className="text-blue-950 text-base font-semibold">Izzat</p>
                                <p className="text-blue-950 text-base font-semibold">2000</p>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white mt-2 rounded-xl border border-yellow-400 shadow-md">
                                <table className="w-80 text-sm text-blue-950 font-semibold text-center border-collapse">
                                    <thead className="border-b border-yellow-400">
                                        <tr>
                                            <th className="py-2">Soni</th>
                                            <th className="py-2">Vaqti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, index) => (
                                            <tr key={index} className="border-b border-yellow-400">
                                                <td className="py-2">{item.soni}</td>
                                                <td className="py-2">{item.vaqti}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                    >
                        <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger className="bg-white border border-yellow-400 rounded-lg px-4 py-2 flex justify-between items-center no-underline">
                                <p className="text-blue-950 text-base font-semibold">Asad</p>
                                <p className="text-blue-950 text-base font-semibold">2000</p>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white mt-2 rounded-xl border border-yellow-400 shadow-md">
                                <table className="w-80 text-sm text-blue-950 font-semibold text-center border-collapse">
                                    <thead className="border-b border-yellow-400">
                                        <tr>
                                            <th className="py-2">Soni</th>
                                            <th className="py-2">Vaqti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, index) => (
                                            <tr key={index} className="border-b border-yellow-400">
                                                <td className="py-2">{item.soni}</td>
                                                <td className="py-2">{item.vaqti}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};
