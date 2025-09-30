/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useStorage } from './utils';

import {
  Bakery,
  BakeryBread,
  BakeryDough,
  Bakerys,
  Balance,
  Chat,
  Checkout,
  Costs,
  Customers,
  Debtors,
  Delivery,
  HomePage,
  LeafletMap,
  Login,
  Message,
  Messages,
  MySalaries,
  Order,
  Orders,
  Profile,
  SalePage,
} from './pages';

import { Layouts } from './layouts';
import { Notifications } from './pages/notification';

import {
  DoughDetails,
  Drivers,
  Income,
  Trade,
} from './pages/balance/components';

import {
  TradeDetails,
  TradeEdit,
} from './pages/balance/components/trade/components';

import { Debts } from './pages/home/components';
import { DebtsDetails } from './pages/home/components/debts/components/general-debts/components';

import { Toaster } from 'react-hot-toast';
import { CustomerDetails } from './pages/customers/components/customer-details';
import { AcceptedOrder, OrderMap } from './pages/orders/components';
import {
  NewOrder,
  OrderPage,
} from './pages/orders/components/old-order/components';

const App = () => {
  const navigate = useNavigate();

  // Token validation function
  const isValidToken = (token: string | null): boolean => {
    if (!token) return false;

    // Basic token format check
    if (!token.startsWith('Bearer ')) return false;

    const actualToken = token.replace('Bearer ', '');

    // Check if token is not just a simple string like "Salom"
    if (actualToken.length < 10) return false;

    // Check if token has JWT format (3 parts separated by dots)
    const tokenParts = actualToken.split('.');
    if (tokenParts.length !== 3) return false;

    try {
      // Decode JWT payload and check expiration
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token has expiration time and if it's expired
      if (payload.exp) {
        if (payload.exp < currentTime) {
          console.warn('Token expired at:', new Date(payload.exp * 1000));
          return false;
        }
      }

      // Check issued at time if available
      if (payload.iat && payload.iat > currentTime) {
        console.warn('Token issued in future:', new Date(payload.iat * 1000));
        return false;
      }

      return true;
    } catch (error) {
      // If token is not a valid JWT format or decode fails, consider it invalid
      console.warn('Invalid JWT token format or decode error:', error);
      return false;
    }
  };

  useEffect(() => {
    const token = useStorage.getTokens()?.accessToken;

    if (!isValidToken(token)) {
      // Clear invalid/expired token from storage
      useStorage.removeCredentials();
      navigate('/login');
    } else if (location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Layouts>
      <Routes>
        {/* Auth */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />

        {/* Dashboard */}
        <Route path='/dashboard' element={<HomePage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/my-salaries' element={<MySalaries />} />

        {/* Orders */}
        <Route path='/orders' element={<Orders />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/orders/accepted/:id' element={<AcceptedOrder />} />
        <Route path='/orders/pre-order/:id' element={<OrderPage />} />
        <Route path='/orders/order-map/:id' element={<OrderMap />} />
        <Route path='/new-order' element={<NewOrder />} />

        <Route path='/bakerys' element={<Bakerys />} />
        <Route path='/bakerys/bakery/:id' element={<Bakery />} />
        <Route path='bakerys/bakery/:id/dough' element={<BakeryDough />} />
        <Route path='bakerys/bakery/:id/bread' element={<BakeryBread />} />
        <Route path='bakerys/bakery/:id/delivery' element={<Delivery />} />

        <Route path='new-order/order' element={<OrderPage />} />
        {/* Debts & Debtors */}
        <Route path='/debts' element={<Debts />} />
        <Route path='/debts/:id' element={<DebtsDetails />} />
        <Route path='/debtors/:id' element={<Debtors />} />

        {/* Trade & Balance */}
        <Route path='/trade' element={<Trade />} />
        <Route path='/trade/:id' element={<TradeDetails />} />
        <Route path='/trade/:id/edit' element={<TradeEdit />} />
        <Route path='/balance' element={<Balance />} />
        <Route path='/balance/income' element={<Income />} />
        <Route path='/drivers' element={<Drivers />} />

        {/* Other Pages */}
        <Route path='/sale' element={<SalePage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/dough-details/:id' element={<DoughDetails />} />
        <Route path='/customer' element={<Customers />} />
        <Route
          path='/customer/customer-details/:id'
          element={<CustomerDetails />}
        />
        <Route path='map' element={<LeafletMap />} />
        {/* <Route path="/map" element={<MapPage />} /> */}
        <Route path='/costs' element={<Costs />} />
        <Route path='/message' element={<Message />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/chat/:id' element={<Chat />} />

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
      <Toaster position='top-center' />
    </Layouts>
  );
};

export default App;
