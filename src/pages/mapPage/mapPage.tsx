import { Avatar, AvatarFallback, AvatarImage } from "@/components"
import { Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"

export const MapPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full ">
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
            <div className="mt-[23%]">
                <div className="w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.700525733367!2d67.02991307632635!3d37.65624411897838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f355f135de70163%3A0x753f2c48a26df1ec!2sSherobod%20tumani%20axborot%20kutubxona%20markazi!5e0!3m2!1sen!2s!4v1732282731913!5m2!1sen!2s"
                        width="100%"
                        height="750"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: "0px" }}
                    ></iframe>
                </div>
            </div>
        </div>
    )
}