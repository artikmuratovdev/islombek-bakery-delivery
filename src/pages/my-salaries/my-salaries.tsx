import { useMeQuery } from '@/app/api';
import {
  useLazyGetStaffProfileCalculatedMoneyQuery,
  useLazyGetStaffProfileReceivedMoneyQuery,
  useUbdateStaffProfileReturnMutation,
} from '@/app/api/profileApi';
import { Button, Input } from '@/components';
import { BottomSheet, Tabs } from '@/components/common';
import { UZBTime } from '@/components/common/uzb-time/uzb-time';
import { useHandleRequest } from '@/hooks';
import { ArrowLeft, Complaint, Notifications } from '@/icons';
import { Reply } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const MySalaries = () => {
  const navigate = useNavigate();
  const { data: me } = useMeQuery();
  const [open, setOpen] = useState(false);
  const [receivedOpen, setReceivedOpen] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: '' });
  const [activeTab, setActiveTab] = useState('hisoblangan');

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const [ubdateStaffProfileReturn] = useUbdateStaffProfileReturnMutation();
  const [getStaffProfileReceivedMoney, { data: receivedMoney }] =
    useLazyGetStaffProfileReceivedMoneyQuery();
  const [getStaffProfileCalculatedMoney, { data: calculatedMoney }] =
    useLazyGetStaffProfileCalculatedMoneyQuery();
  const handleRequest = useHandleRequest();

  useEffect(() => {
    getStaffProfileReceivedMoney({
      id: me?._id as string,
    });
  }, [me]);

  useEffect(() => {
    getStaffProfileCalculatedMoney({
      id: me?._id as string,
    });
  }, [me]);

  const onSubmit = (data: { amount: number }) => {
    handleRequest({
      request: async () => {
        const response = await ubdateStaffProfileReturn({
          id: me?._id as string,
          body: {
            amount: Number(data.amount),
          },
        }).unwrap();
        return response;
      },
      onSuccess: (data) => {
        toast.success(data.message || \"Muvaffaqiyatli amalga oshirildi ✅\");
        setOpen(false);
      },
      onError: (error: { data?: { message?: string } }) => {
        toast.error(error?.data?.message || \"Xatolik yuz berdi ❌\");
      },
    });
  };

  return (
    <section className='h-screen bg-blue-950'>
      <header className='py-3 border-b border-yellow-400 rounded-b-4xl flex justify-between items-center px-4'>
        <button
          className='bg-yellow-400 rounded-full p-2'
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className='text-black w-3 h-3' />
        </button>
        <div className='flex flex-col items-center'>
          <h4 className='text-center justify-center text-white text-2xl font-semibold'>
            Balans <br /> {me?.salaryBalance}
          </h4>
        </div>
        <button onClick={() => navigate('/message')}>
          <Notifications className='text-yellow-400' />
        </button>
      </header>
      <main className='px-5 flex flex-col gap-y-7 mt-10'>
        <div className='flex justify-between items-center'>
          <button onClick={() => navigate('/complaints')}>
            <Complaint className='text-yellow-400' />
          </button>
          <UZBTime
            fetchDate={true}
            onSelectDate={(data) => {
              if (activeTab === 'hisoblangan') {
                getStaffProfileCalculatedMoney({
                  id: me?._id as string,
                  endDate: data.endDate,
                  startDate: data.startDate,
                });
              } else if (activeTab === 'olingan') {
                getStaffProfileReceivedMoney({
                  id: me?._id as string,
                  endDate: data.endDate,
                  startDate: data.startDate,
                });
              }
            }}
          />
        </div>
        <div>
          <Tabs
            defaultValue='hisoblangan'
            value={activeTab}
            onChange={(val) => setActiveTab(val)}
            tabs={[
              {
                label: 'Hisoblangan',
                value: 'hisoblangan',
                children: (
                  <div>
                    <div className='mt-5'>
                      <div>
                        {calculatedMoney?.length !== 0 ? (
                          <>
                            <div className='flex justify-between items-center px-10'>
                              <h4 className=' text-yellow-400 text-sm font-medium'>
                                Ish haqqi
                              </h4>
                              <h4 className=' text-yellow-400 text-sm font-medium'>
                                Sana
                              </h4>
                            </div>
                            <div className='bg-white rounded-lg border-1 border-yellow-400 flex-col'>
                              {calculatedMoney?.map((item, index, array) => (
                                <>
                                  <div
                                    key={index}
                                    className='flex justify-between items-center px-3 py-1'
                                  >
                                    <h3 className='text-blue-950 text-base font-semibold pl-5'>
                                      {item.amount.toLocaleString('ru-RU')}
                                    </h3>
                                    <div className='flex gap-x-2'>
                                      <h4 className='text-blue-950 text-sm font-semibold'>
                                        {item.createdAt.slice(0, 10)}
                                      </h4>
                                      <h4 className='text-blue-950 text-sm font-semibold'>
                                        {item.createdAt.slice(11, 16)}
                                      </h4>
                                    </div>
                                  </div>
                                  {index !== array.length - 1 && (
                                    <div className='border-1 bg-yellow-400 h-1' />
                                  )}
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className='flex justify-center items-center'>
                            <h4 className='text-white text-sm font-semibold'>
                              Hisoblanganlar mavjud emas
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: 'Olingan',
                value: 'olingan',
                children: (
                  <div className='mt-5'>
                    <div className='flex flex-col gap-y-3'>
                      {receivedMoney?.length !== 0 ? (
                        receivedMoney?.map((item) => (
                          <div
                            onClick={() =>
                              setReceivedOpen({ open: true, id: item._id })
                            }
                            className='flex justify-between items-center px-3 py-1 cursor-pointer rounded-2xl bg-white'
                          >
                            <div className='flex flex-col gap-y-1'>
                              <h4 className='text-blue-950 text-base font-semibold'>
                                {item.amount}
                              </h4>
                              <h4
                                className={`text-${
                                  item.amount > item.totalAmount
                                    ? 'red'
                                    : 'green'
                                }-600 text-base font-semibold`}
                              >
                                {item.totalAmount}
                              </h4>
                            </div>
                            <div className='flex gap-x-3'>
                              <h4 className='text-blue-950 text-base font-semibold'>
                                {item.createdAt.slice(0, 10)}
                              </h4>
                              <h4 className='text-blue-950 text-base font-semibold'>
                                {item.createdAt.slice(11, 16)}
                              </h4>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className='text-center text-white text-base font-semibold'>
                          Olingan pul mavjud emas
                        </p>
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Button
        onClick={() => setOpen(!open)}
        className='fixed right-5 bg-amber-400 rounded-full bottom-10'
      >
        <Reply />
      </Button>

      <BottomSheet
        open={open}
        setOpen={setOpen}
        children={
          <div className='border-1 border-yellow-400 mt-10 px-3 py-2 rounded-xl border-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='amount' className='text-yellow-400 text-base'>
                Berilgan pul
              </label>
              <Controller
                name='amount'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      type='number'
                      value={(field.value ?? 0).toString()}
                      onChange={({ target: { value } }) =>
                        field.onChange(Number(value) || 0)
                      }
                      placeholder='Berilgan pul'
                      className='mt-2 bg-white rounded-lg'
                    />
                    {errors.amount && (
                      <span className='text-red-500 mt-2'>
                        This field is required
                      </span>
                    )}
                  </>
                )}
              />
              <h3 className='text-white text-base mt-5'>
                Balans: {me?.salaryBalance}
              </h3>

              <div className='flex justify-end mt-5'>
                <Button className='bg-yellow-500'>Yuborish</Button>
              </div>
            </form>
          </div>
        }
      />
      <BottomSheet
        open={receivedOpen.open}
        setOpen={() => setReceivedOpen({ open: false, id: null })}
        children={
          <div className='border-1 border-yellow-400 mt-2 px-2 py-3 rounded-lg'>
            <div className='flex flex-col gap-y-3'>
              <div className='bg-white px-3 py-1 rounded-lg'>
                <h4 className='text-blue-950 text-base font-semibold'>
                  {receivedMoney?.find((item) => item._id === receivedOpen.id)
                    ?.fromUser
                    ? receivedMoney?.find(
                        (item) => item._id === receivedOpen.id
                      )?.fromUser.fullName
                    : "Noma'lum"}
                </h4>
              </div>
              <div className='bg-white px-3 py-1 rounded-lg flex justify-between'>
                <h4 className='text-blue-950 text-base font-semibold'>
                  {
                    receivedMoney?.find((item) => item._id === receivedOpen.id)
                      ?.amount
                  }
                </h4>
                <h4 className='text-blue-950 text-base font-semibold'>
                  {receivedMoney
                    ?.find((item) => item._id === receivedOpen.id)
                    ?.createdAt.slice(0, 16)
                    .split('T')
                    .join(' ')}
                </h4>
              </div>
              <div className='flex justify-end mt-5'>
                <Button
                  onClick={() => setReceivedOpen({ open: false, id: null })}
                  className='bg-yellow-400'
                >
                  Yopish
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
};
