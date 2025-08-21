/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  HomePage,
  Login,
  Orders,
  SalePage,
  Costs,
  Message,
  Messages,
  Chat,
  Order,
  Debtors,
  Profile,
  Balance,
  Bakery,
  Checkout,
  Customers,
  MapPage,
} from "./pages";
import { Layouts } from "./layouts";
import { Notifications } from "./pages/notification";
import { useEffect } from "react";
import {
  DoughDetails,
  Drivers,
  Income,
  Trade,
} from "./pages/balance/components";
import { TradeDetails } from "./pages/balance/components/trade/components";
import { Debts } from "./pages/home/components";
import { DebtsDetails } from "./pages/home/components/debts/components/general-debts/components";
import { OrderMap } from "./pages/orders/components";
import {
  NewOrder,
  OrderPage,
} from "./pages/orders/components/old-order/components";
import {
  BakeryDetails,
  BakeryDispatcher,
  DispatcherDetails,
} from "./pages/bakery/components";
import { CustomerDetails } from "./pages/customers/components/customer-details";
import { useStorage } from "./utils";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = useStorage.getTokens()?.accessToken;
    if (!token) {
      navigate("/login");
    } else if (location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Layouts>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<Order />} />
        
        <Route path="/debtors/:id" element={<Debtors />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/balance/income" element={<Income />} />
        <Route path="/debts" element={<Debts />} />
        <Route path="/debts/debts-details" element={<DebtsDetails />} />
        <Route path="/trade/trade-details" element={<TradeDetails />} />
        <Route path="/orders/order-map" element={<OrderMap />} />
        <Route path="/new-order" element={<NewOrder />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/bakery/bakery-details" element={<BakeryDetails />} />
        <Route
          path="bakery/bakery-details/dispatcher"
          element={<BakeryDispatcher />}
        />
        <Route
          path="bakery/bakery-details/dispatcher-details"
          element={<DispatcherDetails />}
        />
        <Route path="new-order/order" element={<OrderPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dough-details" element={<DoughDetails />} />
        <Route path="/customer" element={<Customers />} />
        <Route
          path="/customer/customer-details"
          element={<CustomerDetails />}
        />
        <Route path="map" element={<MapPage />} />
        <Route path="/costs" element={<Costs />} />
        <Route path="/message" element={<Message />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layouts>
  );
};

export default App;
