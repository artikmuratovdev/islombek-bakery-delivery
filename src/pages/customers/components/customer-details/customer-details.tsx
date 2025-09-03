import { useGetClientByIdQuery, useLazyGetUserQuery } from '@/app/api';
import { Button } from '@/components';
import { ArrowLeft, Clock, Notifications } from '@/icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const setTime = (isoString: Date | string): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const distanceTime = (date1: Date | string, date2: Date | string) => {
  if (typeof date1 === 'string') date1 = new Date(date1);
  if (typeof date2 === 'string') date2 = new Date(date2);

  const diffTime = Math.abs(date1.getTime() - date2.getTime());

  const hours = Math.floor(diffTime / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  if (hours > 0) return `${h}:${m}:${s}`;
  if (minutes > 0) return `${m}:${s}`;
  return `${s}s`;
};

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetClientByIdQuery({ id });
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const number = searchParams.get('number');

  const [getDriver] = useLazyGetUserQuery();
  const [drivers, setDrivers] = useState<string[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      if (!data?.orders) return;

      const results: string[] = [];

      for (const order of data.orders) {
        const driverId =
          typeof order.acceptedDriver === 'string'
            ? order.acceptedDriver
            : (order.acceptedDriver as { _id: string })._id;

        try {
          const res = await getDriver(driverId).unwrap();
          results.push(res.fullName);
        } catch (err) {
          console.error('Failed to fetch driver', driverId, err);
        }
      }

      setDrivers(results);
    };

    fetchDrivers();
  }, [data, getDriver]);
  console.log(drivers);

  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex items-center justify-between'>
          <Button
            onClick={() => navigate('/customers')}
            className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h4 className='text-center justify-center text-white text-2xl font-semibold'>
            {name} <br /> {number}
          </h4>
          <button onClick={() => navigate('/notifications')}>
            <Notifications className='cursor-pointer text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>

      <div className='mt-[120px] m-auto p-[16px] space-y-5'>
        {data &&
          (data.orders && data.orders.length > 0 ? (
            data.orders.map((order, index) => (
              <div
                key={order._id}
                className='w-full bg-white rounded-lg border border-yellow-400 p-3'
              >
                <div className='flex justify-between items-center gap-1 mb-2'>
                  <p className='text-blue-950 text-base font-bold leading-tight'>
                    {drivers[index]}
                  </p>
                  <p className='text-red-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center'>
                    {setTime(order.createdAt)}
                  </p>
                  <p className='text-blue-950 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center gap-x-2'>
                    <Clock />{' '}
                    {order.deliveryTime &&
                    distanceTime(order.createdAt, order.deliveryTime)}
                  </p>
                  <p className='text-green-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center'>
                    {order.deliveryTime && setTime(order.deliveryTime)}
                  </p>
                </div>
                <div className='space-y-2'>
                  {order.breadsInfo.map((bread) => (
                    <div
                      key={bread._id}
                      className='flex justify-between items-center mt-2'
                    >
                      <h4 className='text-blue-950 text-sm font-bold'>
                        {bread.title}
                      </h4>
                      <p className='text-blue-950 text-sm font-bold'>
                        {bread.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-yellow-400'>
              Mahsulotlar mavjud emas
            </p>
          ))}
      </div>
    </div>
  );
};
