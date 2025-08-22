/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStorage } from "./utils";

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

import {
  DoughDetails,
  Drivers,
  Income,
  Trade,
} from "./pages/balance/components";

import {
  TradeDetails,
  TradeEdit,
} from "./pages/balance/components/trade/components";

import { Debts } from "./pages/home/components";
import { DebtsDetails } from "./pages/home/components/debts/components/general-debts/components";

import { AcceptedOrder, OrderMap } from "./pages/orders/components";
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
        {/* Auth */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orders/accepted/:id" element={<AcceptedOrder />} />
        <Route path="/orders/pre-order/:id" element={<OrderPage />} />
        <Route path="/orders/order-map" element={<OrderMap />} />
        <Route path="/orders/order-map/:id" element={<OrderMap />} />
        <Route path="/new-order" element={<NewOrder />} />

        {/* Debts & Debtors */}
        <Route path="/debts" element={<Debts />} />
        <Route path="/debts/:id" element={<DebtsDetails />} />
        <Route path="/debtors/:id" element={<Debtors />} />

        {/* Trade & Balance */}
        <Route path="/trade" element={<Trade />} />
        <Route path="/trade/:id" element={<TradeDetails />} />
        <Route path="/trade/:id/edit" element={<TradeEdit />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/balance/income" element={<Income />} />
        <Route path="/drivers" element={<Drivers />} />

        {/* Bakery */}
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/bakery/bakery-details" element={<BakeryDetails />} />
        <Route
          path="/bakery/bakery-details/dispatcher"
          element={<BakeryDispatcher />}
        />
        <Route
          path="/bakery/bakery-details/dispatcher-details"
          element={<DispatcherDetails />}
        />

        {/* Other Pages */}
        <Route path="/sale" element={<SalePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dough-details" element={<DoughDetails />} />
        <Route path="/customer" element={<Customers />} />
        <Route
          path="/customer/customer-details"
          element={<CustomerDetails />}
        />
        <Route path="/map" element={<MapPage />} />
        <Route path="/costs" element={<Costs />} />
        <Route path="/message" element={<Message />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chat/:id" element={<Chat />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Layouts>
  );
};

export default App;
