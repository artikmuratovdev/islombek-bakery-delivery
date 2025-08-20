import { Props } from "./types";

export const Tabs = ({ tabs, activeTab, onTabChange }: Props) => {
  return (
    <div className="flex justify-between bg-white text-[#1C2C57] rounded-[7px] mb-[24px]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`w-full text-center py-[6.7px] font-inter font-bold rounded-[7px] ${
            activeTab === tab.value ? "bg-[#FFCC15]" : "bg-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
