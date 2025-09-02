import { Button, Input } from '@/components';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Notifications, Plus } from '@/icons';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bottom } from './components';
import { breadInfo } from '@/app/api/orderApi/types';
import { Controller, useForm } from 'react-hook-form';
import {
  useDeleteOrderMutation,
  useGetBreadPricesQuery,
  useGetOneOrderQuery,
  useSubmitPreOrderMutation,
} from '@/app/api';
import BreadList from '@/components/form/BreadLists/BreadList';
import { BottomSheet } from '@/components/common';
import toast, { Toaster } from 'react-hot-toast';

export const OrderPage = () => {
  const { id } = useParams();
  const { data: breadPrice } = useGetBreadPricesQuery();
  const { data: preOrder, refetch } = useGetOneOrderQuery(id as string);
  const [submitPreOrder] = useSubmitPreOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const [breads, setBreads] = useState<breadInfo[]>([]);

  console.log(preOrder);

  const { control, reset } = useForm({
    defaultValues: {
      client: '',
      phone: '',
      address: '',
      commit: '',
      deliveryTime: '',
      paidAmount: 0,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (preOrder) {
      reset({
        client:
          typeof preOrder?.client === 'string'
            ? preOrder?.client
            : preOrder?.client?.fullName ?? '',
        phone: preOrder?.phone ?? '',
        address: preOrder?.address ?? '',
        commit: preOrder?.commit ?? '',
        deliveryTime: preOrder?.deliveryTime,
        paidAmount: preOrder?.paidAmount ?? 0,
      });

      if (breadPrice) {
        setBreads(
          breadPrice.map((b) => ({
            ...b,
            amount:
              preOrder.breadsInfo.find((item) => item._id === b._id)?.amount ||
              0,
          }))
        );
      }
    }
    refetch();
  }, [id, preOrder, breadPrice, reset, refetch]);

  const [open, setOpen] = useState(false);

  const submitting = async () => {
    try {
      if (preOrder) {
        const {message} = await submitPreOrder(preOrder._id).unwrap();
        toast.success(message);
        navigate('/orders',{state:'preOrder'});
      }
    } catch (error : any) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  return (
    <div className='w-full max-w-2xl pb-20'>
      <Toaster/>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] fixed top-0 w-full max-w-2xl z-10 mx-auto'>
        <div className='flex w-[95%] m-auto justify-between items-center'>
          <Button
            onClick={() => navigate('/orders',{state:'preOrder'})}
            className='w-5 h-5 bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h3 className='text-white text-2xl font-semibold'>Buyurtma</h3>
          <button onClick={() => navigate('/notifications')}>
            <Notifications className='text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>

      <div className='mt-[21%] px-4'>
        <div className='space-y-2 mt-2'>
          {/* Client */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Mijoz
            </Label>
            <Controller
              name='client'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  placeholder='Mijozni kiriting'
                  id='client'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
              )}
            />
          </div>
          {/* Phone */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Telefon
            </Label>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  placeholder='Telefon raqamni kiriting'
                  id='phone'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
              )}
            />
          </div>
          {/* Address */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Manzil
            </Label>
            <Controller
              name='address'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  placeholder='Manzilni kiriting'
                  id='address'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
              )}
            />
          </div>
          {/* Commit */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Izoh
            </Label>
            <Controller
              name='commit'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  placeholder='Izohni kiriting'
                  id='commit'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
              )}
            />
          </div>
          {/* Delivery time */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Topshirish vaqti
            </Label>
            <Controller
              name='deliveryTime'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  id='deliveryTime'
                  type='text'
                  className='w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2'
                />
              )}
            />
          </div>
          {/* Paid amount */}
          <div className='mb-2 space-y-2'>
            <Label className='text-yellow-400 text-base font-semibold leading-none'>
              Olingan pul
            </Label>
            <Controller
              name='paidAmount'
              control={control}
              render={({ field }) => (
                <Input
                  readOnly
                  {...field}
                  placeholder='Olingan pul miqdorini kiriting'
                  id='paidAmount'
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  value={field.value}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '');
                    field.onChange(onlyNumbers);
                  }}
                  className='w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2'
                />
              )}
            />
          </div>
        </div>

        <div className='space-y-3 pt-2 mb-5'>
          {breads && (
            <BreadList breadPrices={breads} priceHide setBreads={setBreads} />
          )}
        </div>

        {preOrder?.paymentHistory &&
          preOrder.paymentHistory.length > 0 &&
          preOrder.paymentHistory.map((p) => {
            const date = new Date(p.paymentDate);
            date.setTime(date.getTime());

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return (
              <div
                key={p._id}
                className='w-full h-11 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-4 mt-3'
              >
                <h3 className="text-blue-950 text-base font-semibold font-['Inter'] w-70">
                  {p.fromUser?.fullName} <br /> {p.fromUser?.role}{' '}
                  <span className='text-green-700 ml-3'>
                    {p.amount.toLocaleString('ru-RU')}
                  </span>
                </h3>
                <h3 className="text-blue-950 text-base font-semibold font-['Inter'] w-30">
                  <p>{`${day}-${month}-${year}`}</p>
                  <p className='text-end'>{`${hours}:${minutes}`}</p>
                </h3>
              </div>
            );
          })}
      </div>

      <div className=' mt-2 px-4 flex flex-col space-y-2 items-start'>
        <Button
          className='w-36 h-9 p-3 bg-yellow-400 rounded-lg text-[#1C2C57] inline-flex justify-center items-center gap-1 hover:bg-yellow-400 font-bold'
          onClick={submitting}
        >
          Topshirish
        </Button>
        <Button
          className='w-36 h-9 p-3 bg-red-600 rounded-lg text-white inline-flex justify-center items-center gap-1 hover:bg-red-600 font-bold'
          onClick={() => {
            if (preOrder) {
              deleteOrder(preOrder?._id);
              navigate(`/orders`);
            }
          }}
        >
          O'chirish
        </Button>
        <Button
          className='fixed right-5 bottom-24 h-12 aspect-square p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]'
          onClick={() => setOpen(true)}
        >
          <Plus className='scale-150' />
        </Button>
      </div>

      <BottomSheet open={open} setOpen={setOpen}>
        <Bottom
          id={preOrder?._id as string}
          debt={preOrder?.debtAmount as number}
          breads={breads}
          setBreads={setBreads}
          refetch={() => {setOpen(false);refetch()}}
        />
      </BottomSheet>
    </div>
  );
};

export function formatForDateTimeLocal(input?: string | Date): string {
  if (!input) return '';

  let d: Date;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === 'string') {
    // Case 1: already ISO-like (yyyy-mm-ddThh:mm)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(input)) {
      d = new Date(input);
    }
    // Case 2: dd.mm.yyyy hh:mm
    else if (/^\d{2}\.\d{2}\.\d{4}\s\d{2}:\d{2}$/.test(input)) {
      const [datePart, timePart] = input.split(' ');
      const [day, month, year] = datePart.split('.').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      d = new Date(year, month - 1, day, hour, minute);
    } else {
      return ''; // unsupported format
    }
  } else {
    return '';
  }

  if (isNaN(d.getTime())) return '';

  // convert to yyyy-MM-ddTHH:mm
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
