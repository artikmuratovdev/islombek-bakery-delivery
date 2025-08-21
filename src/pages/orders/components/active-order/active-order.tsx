import { Checkbox } from '@/icons';
import { useNavigate } from 'react-router-dom';
import { useAcceptOrderMutation, useGetActiveOrdersQuery } from '@/app/api';
import { useEffect, useState } from 'react';

export const getTimes = (date: Date | string, currentTime: number) => {
    const past = new Date(date).getTime();
    const diffMs = currentTime - past;

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

export const ActiveOrder = () => {
  const navigate = useNavigate();
  const { data, refetch } = useGetActiveOrdersQuery();
  const [acceptOrder, { isSuccess }] = useAcceptOrderMutation();


  const [currentTime, setCurrentTime] = useState(Date.now());
    useEffect(() => {
      refetch()
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [isSuccess,refetch]);

  


  return (
    <div>
      <div className='grid gap-4 text-center'>
        <div className='grid grid-cols-8 gap-4 bg-[#ffcb15] p-2 font-semibold text-[#1B2B56] rounded'>
          <span className='col-span-2'>Vaqti</span>
          <span>Soni</span>
          <span className='col-span-4'>Manzili</span>
          <span></span>
        </div>
      </div>

      <div className='mt-5 space-y-4'>
        {data?.orders?.map((order) => (
          <div
            key={order._id}
            className={`w-full h-10 rounded-lg border border-yellow-400 grid grid-cols-8 justify-between items-center px-4 ${
              order.acceptedDriver ? 'bg-white' : 'bg-yellow-400'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (order._id) {
                navigate(`order-map/${order._id}`);
              } else {
                console.error('Order ID is missing');
              }
            }}
          >
            <h2 className='text-blue-950 text-base font-bold leading-tight col-span-2'>
              {getTimes(order.createdAt || '',currentTime)}
              {/* {order.createdAt?.toString()?.slice(11, 16) || 'N/A'} */}
            </h2>
            <h2 className='text-blue-950 text-base text-center font-bold leading-tight'>
              {order.breadCount || 0}
            </h2>
            <h2 className='text-blue-950 text-base text-center font-bold leading-tight col-span-4'>
              {order.address || 'No address provided'}
            </h2>
            {!order.acceptedDriver && (
              <div
                className='flex items-center justify-end'
                onClick={(e) => {
                  e.stopPropagation();
                  if (order._id) {
                    acceptOrder(order._id);
                  } else {
                    console.error('Order ID is missing for acceptance');
                  }
                }}
              >
                <Checkbox />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
