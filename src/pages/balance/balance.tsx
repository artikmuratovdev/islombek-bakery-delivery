import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components";
import {
    Chevron,
    MessagesIcon,
    MessagesIcons,
    Notifications,
} from "@/icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const DATA = [
    {
        id: 2,
        label: "Qarzlar",
        value: "8 000 000",
        color: "text-red-600",
    },
    {
        id: 4,
        label: "Xarajatlar",
        value: "3 000 000",
        color: "text-red-600",
    },
]

export const Balance = () => {
    const [open, setOpen] = useState(false);

    const doughItems = [
        { name: "Jo’rabayeva", time: "02:44:00", count: 4 },
        { name: "Bochka", time: "01:11:00", count: 3 },
    ];

    const totalCount = doughItems.reduce((sum, item) => sum + item.count, 0);
    const navigate = useNavigate();

    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto justify-between items-center">
                    <div
                        className="flex gap-x-2 items-center"
                        onClick={() => navigate("/profile")}
                    >
                        <Avatar>
                            <AvatarImage
                                className="w-10 h-10"
                                src="https://github.com/shadcn.png"
                                alt="Avatar"
                            />
                            <AvatarFallback>Sardor</AvatarFallback>
                        </Avatar>
                        <h2 className="text-white text-xl font-semibold font-inter">
                            Guest
                        </h2>
                    </div>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[30%] w-[95%] m-auto p-[12px] overflow-y-auto h-auto mb-20 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate("/message")}>
                        <MessagesIcon className="w-6 h-6 text-[#FFCC15]" />
                    </button>
                    <button onClick={() => navigate("/messages")}>
                        <MessagesIcons className="w-6 h-6 text-[#FFCC15]" />
                    </button>
                </div>
                <div
                    onClick={() => navigate("/trade")}
                    className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
                >
                    <div className="w-full flex items-center justify-between px-6 h-full">
                        <h2 className="text-blue-950 text-xl font-extrabold">Savdo</h2>
                        <div className="flex items-center gap-x-2">
                            <h2 className={`text-xl font-extrabold text-green-700`}>6 000 000</h2>
                            <Chevron />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => navigate("income")}
                    className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
                >
                    <div className="w-full flex items-center justify-between px-6 h-full">
                        <h2 className="text-blue-950 text-xl font-extrabold">Kirim</h2>
                        <div className="flex items-center gap-x-2">
                            <h2 className={`text-xl font-extrabold text-blue-950`}>10 000 000</h2>
                            <Chevron />
                        </div>
                    </div>
                </div>
                {DATA.map(({ label, value, color }, index) => (
                    <div
                        key={index}
                        className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
                    >
                        <div className="w-full flex items-center justify-between px-6 h-full">
                            <h2 className="text-blue-950 text-xl font-extrabold">{label}</h2>
                            <div className="flex items-center gap-x-2">
                                <h2 className={`text-xl font-extrabold ${color}`}>{value}</h2>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="w-full h-12 bg-yellow-400 rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden">
                    <div className="w-full flex items-center justify-between px-6 h-full">
                        <h2 className="text-blue-950 text-xl font-extrabold">Balans</h2>
                        <h2 className="text-blue-950 text-2xl font-semibold">4 000 000</h2>
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-full bg-white border-2 border-[#FFCC15] h-12 px-4 text-blue-950 text-[18px] font-semibold">
                        <SelectValue placeholder="Nonlar: 850" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="chigatoy">Chig’atoy - 500</SelectItem>
                            <SelectItem value="buxonka">Buxonka - 200</SelectItem>
                            <SelectItem value="samarqand">Samarqand - 100</SelectItem>
                            <SelectItem value="patir">Patir - 50</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="w-full">
                    <div
                        onClick={() => setOpen(!open)}
                        className="w-full h-12 bg-white border-2 border-[#FFCC15] rounded-lg flex justify-between items-center px-4 cursor-pointer"
                    >
                        <h2 className="text-blue-950 text-xl font-extrabold">Xamirlar</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-950 text-xl font-bold">{totalCount}</span>
                            {open ? (
                                <ChevronUp className="text-blue-950" />
                            ) : (
                                <ChevronDown className="text-blue-950" />
                            )}
                        </div>
                    </div>
                    {open && (
                        <div className="mt-2 space-y-2">
                            {doughItems.map((item, index) => (
                                <div
                                    onClick={() => navigate("/dough-details")}
                                    key={index}
                                    className="w-full bg-white border-2 border-[#FFCC15] rounded-lg px-4 py-2 flex justify-between items-center"
                                >
                                    <span className="text-blue-950 font-semibold">{item.name}</span>
                                    <span className="text-blue-950 font-bold">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div
                        onClick={() => navigate("/drivers")}
                        className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden mt-5"
                    >
                        <div className="w-full flex items-center justify-between px-6 h-full">
                            <h2 className="text-blue-950 text-xl font-extrabold">Haydovchilar</h2>
                            <div className="flex items-center gap-x-2">
                                <Chevron />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
