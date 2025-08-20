import { useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Footer } from "../footer";

const PUBLIC_ROUTES = [
  "/login",
  "/sale",
  "/message",
  "/messages",
  "/chat/:id",
  "costs",
  "/profile",
  "/notifications",
  "/debts",
  "/trade",
  "/balance/income",
  "/dough-details",
  "/drivers",
  "/orders/order-map",
  "/new-order",
  "/new-order/order",
  "/bakery",
  "/bakery/bakery-details",
  "/bakery/bakery-details/dispatcher",
  "/bakery/bakery-details/dispatcher-details",
  "/checkout",
  "/customer",
  "customer/customer-details"
];

export const Layouts = ({
  children,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) => {
  const { pathname } = useLocation();

  const isAuth = useMemo(() => {
    return !PUBLIC_ROUTES.some((route) => matchPath({ path: route }, pathname));
  }, [pathname]);

  return (
    <div>
      {children}
      {isAuth && <Footer />}
    </div>
  );
};
