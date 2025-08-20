import { BakeryIcons, CashReportIcons, HomeIcons, OrdersIcons } from "@/icons";

export const MAIN_TABS_LINK = [
  {
    id: 1,
    title: "Asosiy",
    path: "/dashboard",
    icon: <HomeIcons />,
  },
  {
    id: 2,
    title: "Balans",
    path: "/balance",
    icon: <BakeryIcons />,
  },
  {
    id: 3,
    title: "Xarita",
    path: "/map",
    icon: <CashReportIcons />,
  },
  {
    id: 4,
    title: "Zakazlar",
    path: "/orders",
    icon: <OrdersIcons />,
  },
];
