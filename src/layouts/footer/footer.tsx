import { Link, useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { MAIN_TABS_LINK } from "@/mock";

// 🔹 Static demo orders count
const demoOrdersCount = 3;

export const Footer = () => {
  const location = useLocation();

  const leftLinks = MAIN_TABS_LINK.slice(
    0,
    Math.ceil(MAIN_TABS_LINK.length / 2)
  );
  const rightLinks = MAIN_TABS_LINK.slice(Math.ceil(MAIN_TABS_LINK.length / 2));

  return (
    <div className="border-t-2 border-[#FFCC15] rounded-t-[40px] bg-[#1C2C57] p-[12px] fixed -bottom-1 w-full z-50">
      <div className="flex w-full justify-between items-center relative px-6">
        <div className="flex flex-1 justify-evenly">
          {leftLinks.map((item) => {
            const isActive =
              item.path === "/orders"
                ? location.pathname.startsWith("/order") ||
                  location.pathname.startsWith("/debtors")
                : location.pathname.startsWith(item.path);
            return (
              <Link to={item.path} key={item.id}>
                <div className="flex flex-col gap-y-1 items-center text-center relative">
                  {item.path === "/orders" && (
                    <div className="bg-[#ffcb15] rounded-full absolute -top-2 right-0 text-center text-[#1b2b56] text-xs font-semibold font-inter px-1 py-0.5">
                      {demoOrdersCount}
                    </div>
                  )}
                  <span
                    className={`text-2xl ${
                      isActive ? "text-[#FFCC15]" : "text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <p
                    className={`text-[10px] mt-[2px] font-semibold font-inter leading-[14.30px] ${
                      isActive ? "text-[#FFCC15]" : "text-white"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          to="/sale"
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-[#FFCC15] p-4 rounded-full shadow-lg">
            <FiPlus className="text-[#1C2C57] text-xl" />
          </div>
        </Link>

        <div className="flex flex-1 justify-evenly ml-14 gap-x-5">
          {rightLinks.map((item) => {
            const isActive =
              item.path === "/orders"
                ? location.pathname.startsWith("/order") ||
                  location.pathname.startsWith("/debtors")
                : location.pathname.startsWith(item.path);
            return (
              <Link to={item.path} key={item.id}>
                <div className="flex flex-col gap-y-1 items-center text-center relative">
                  {item.path === "/orders" && (
                    <div className="bg-[#ffcb15] rounded-full absolute -top-2 right-0 text-center text-[#1b2b56] text-xs font-semibold font-inter px-1 py-0.5">
                      {demoOrdersCount}
                    </div>
                  )}
                  <span
                    className={`text-2xl ${
                      isActive ? "text-[#FFCC15]" : "text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <p
                    className={`text-[10px] mt-[2px] font-semibold font-inter leading-[14.30px] ${
                      isActive ? "text-[#FFCC15]" : "text-white"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
