import {
  useAcceptOrderMutation,
  useGetOneOrderQuery,
  useMeQuery,
  useSendLocationMutation,
} from '@/app/api';
import { Button } from '@/components';
import { ArrowLeft, Notifications } from '@/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getTimes } from '../active-order';
import { useEffect, useState } from 'react';
import { useOnline } from '@reactuses/core';
import { socket } from '@/utils';
import LeafletMap from './components/LeafletMap';
import toast, { Toaster } from 'react-hot-toast';
import { activeOrder } from '@/app/api/orderApi/types';

export const setPhoneNumber = (number: string) =>
  number.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

export interface Driver {
  user: { _id: string };
  lat: number;
  lng: number;
  rot?: number;
}

export const OrderMap = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {data:me} = useMeQuery();
  const { data } = useGetOneOrderQuery(id as string);
  const [acceptOrder] = useAcceptOrderMutation();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [selectedLocation, setSelectedLocation] = useState<Driver | null>(null);
  const [sendLocation] = useSendLocationMutation();

  const online = useOnline();
  const setLocation = (driver: Driver) => {
    if (!online) {
      const rest: Array<typeof driver> = JSON.parse(
        localStorage.getItem('update') || '[]'
      );
      localStorage.setItem('update', JSON.stringify(rest.concat(driver)));
    } else {
      socket.emit('location', driver, (res = null) => {
        console.log(driver, res);
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('driver', me?.fullName as string)
  },[me?.fullName])

  const postLocation = async () => {
    if (selectedLocation) {
      try {
        const res = await sendLocation({
          id: id as string,
          body: {
            location: { lat: selectedLocation.lat, lng: selectedLocation.lng },
          },
        }).unwrap();

        console.log('sendLocation response:', res);
        toast.success(res.message || 'Joylashuv saqlandi');
      } catch (err: any) {
        console.error('sendLocation error:', err);
        toast.error(err?.data?.message || 'Xatolik yuz berdi');
      }
    }
  };

  const acceptOrderData = async () => {
    try {
      const res = await acceptOrder(id as string).unwrap();
      // backenddan {"message":"Zakaz qabul qilindi"} keladi
      toast.success(res.message || "Zakaz qabul qilindi ✅");
      navigate('/orders',{state:'activeOrder'});
    } catch (err: any) {
      toast.error(err?.data?.message || "Xatolik yuz berdi ❌");
    }
  };

  useEffect(() => {
    if (online) {
      const pending: Array<{
        lat: number;
        lng: number;
        rot?: number;
        user: { _id: string };
      }> = JSON.parse(localStorage.getItem('update') || '[]');
      pending.forEach((driver) => {
        socket.emit('location', driver);
      });
      localStorage.removeItem('update');
    }
  }, [online]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='w-full max-w-2xl'>
      <Toaster />
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl mx-auto z-30'>
        <div className='flex w-[95%] m-auto justify-between items-center'>
          <Button
            onClick={() => navigate('/orders',{state:'activeOrder'})}
            className='w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h3 className='text-white text-2xl font-semibold'>Zakazlar</h3>
          <button onClick={() => navigate('/notifications')}>
            <Notifications className='text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>
      <div className='mt-[90px] mb-20'>
        <div className='px-4'>
          <LeafletMap
            setLocation={setLocation}
            setSelectLocation={setSelectedLocation}
          />
          <div className='w-full h-24 bg-white rounded-lg border border-yellow-400 mt-2 space-y-2'>
            <div className='w-full flex justify-between px-4 items-center mt-3'>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {getTimes(data?.createdAt || '', currentTime)}
              </h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {(data?.client as { fullName: string }).fullName}
              </h2>
            </div>
            <div className='w-full flex justify-between px-4 items-center'>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {data && setPhoneNumber(data?.phone as string)}
              </h2>
              <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight">
                {data?.address}
              </h2>
            </div>
            <h2 className="text-blue-950 text-base font-bold font-['Inter'] leading-tight text-center">
              {data?.commit}
            </h2>
          </div>
          <div className='w-full h-auto bg-white rounded-lg border border-yellow-400 my-2 space-y-3'>
            {Array.isArray(data?.breadsInfo) &&
              data?.breadsInfo.map((item) => (
                <div
                  key={item._id}
                  className='grid grid-cols-3 px-4 items-center py-2'
                >
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight ">
                    {item.title}
                  </h2>
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight text-end">
                    {item.breadSoldPrice.toLocaleString('uz')}
                  </h2>
                  <h2 className="text-blue-950 text-sm font-extrabold font-['Inter'] leading-tight text-end">
                    {item.amount}
                  </h2>
                </div>
              ))}
          </div>
          <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none mt-2">
            Umumiy summa: {data?.totalAmount.toLocaleString('uz')}
          </h1>
          <div className='flex items-end flex-col-reverse'>
            <Button
              onClick={acceptOrderData}
              className='w-40 h-8 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-center items-center gap-3 text-[#1B2B56] hover:bg-yellow-400 mt-5'
            >
              Qabul qilish
            </Button>
            <Button
              onClick={postLocation}
              className='w-40 h-8 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-center items-center gap-3 text-[#1B2B56] hover:bg-yellow-400 mt-5'
            >
              Joylashuvni saqlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
