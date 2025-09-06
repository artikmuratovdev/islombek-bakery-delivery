import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast  from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Delete_Modal } from './DeleteModal';
import { GetExpensesResponse } from '@/app/api/checkout/types';
import { useDeleteExpenseMutation } from '@/app/api/checkout';
import { EditReport } from './editExpenses';
import { useHandleRequest } from '@/hooks';

export const Salary = ({ items }: { items: GetExpensesResponse[] }) => {
  const [deleteExpenses] = useDeleteExpenseMutation();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
    },
  });


  const setDatas = (name: string, price: string) => {
    reset({ name, price });
  };

  const handleRequest = useHandleRequest();

  const deleteDatas = async (id: string) => {
    await handleRequest({
      request: async () => {
        const res = await deleteExpenses(id);
        return res;
      },
      onSuccess:(data) => {
        toast.success(data.data.message);
      },
      onError: (error : any) => {
        toast.error(error.message);
      }
    })
  };

  const onSubmit = () => {
    reset();
    setOpen(false);
  };
  return (
    <div>
      <div className='space-y-4'>
        <Sheet open={open} onOpenChange={setOpen}>
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                setDatas(
                  (item.reason?.content || item.toUser?.fullName) as string,
                  Number(item.amount).toLocaleString('ru-RU')
                )
              }
              className={
                (item.approval === 'PENDING'
                  ? 'bg-yellow-400 border-yellow-400'
                  : item.approval === 'REJECTED'
                  ? 'bg-[#C71A1A] border-[#C71A1A] text-white'
                  : 'bg-white') +
                '  rounded-[8px]  p-[10px] border-[1px]  flex items-center justify-between gap-x-2 text-[16px] text-[#1C2C57] font-[600]'
              }
            >
              <SheetTrigger className='w-full flex items-center justify-between gap-x-2'>
                <p>{item.toUser?.fullName}</p>
                <p>{Number(item.amount).toLocaleString('ru-RU')}</p>
              </SheetTrigger>
              <Popover>
                <PopoverTrigger>
                  <BsThreeDotsVertical />
                </PopoverTrigger>
                <PopoverContent className='max-w-max bg-white border-2 border-[#1C2C57] rounded-[8px]'>
                  {item.fromUser && (
                    <EditReport
                      editId={item._id}
                      amount={Number(item.amount).toLocaleString('ru-RU')}
                      selectedUser={item.toUser?._id}
                      commit={item.reason?.content}
                      expense_type={item.expense_type}
                      fromUser={item?.fromUser._id}
                    />
                  )}
                  <div className='flex items-center gap-2 p-2 pr-16'>
                    <RiDeleteBin5Line size={25} className='text-[#C71A1A]' />
                    <Delete_Modal onDelete={() => deleteDatas(item._id)}>
                      O'chirish
                    </Delete_Modal>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ))}

          <SheetContent
            side={'bottom'}
            className='bg-[#1C2C57] border-none rounded-t-[20px]'
          >
            <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <div className='w-full space-y-3'>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <input
                        type='text'
                        className='border border-[#FFCC15] bg-white outline-none p-1 px-2 font-semibold text-[#1C2C57] rounded-[8px] w-full'
                        {...field}
                        readOnly
                        value={field.value}
                      />
                    )}
                  />
                  {errors && (
                    <p className='text-red-500 text-[12px]'>
                      {errors.name?.message}
                    </p>
                  )}

                  <Controller
                    name='price'
                    control={control}
                    render={({ field }) => (
                      <input
                        type='text'
                        className='border border-[#FFCC15] bg-white outline-none p-1 px-2 font-semibold text-[#1C2C57] rounded-[8px] w-full'
                        {...field}
                        readOnly
                        value={field.value}
                      />
                    )}
                  />
                  {errors && (
                    <p className='text-red-500 text-[12px]'>
                      {errors.price?.message}
                    </p>
                  )}
                </div>
              </form>

              <Button
                variant={'yellow'}
                onClick={() => setOpen(false)}
                className='text-[16px] font-[600] ml-auto mt-5 px-8'
              >
                Yopish
              </Button>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
