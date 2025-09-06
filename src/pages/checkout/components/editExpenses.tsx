import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { SelectUser } from '@/components';
import { useGetAllUsersQuery } from '@/app/api';
import { useEditExpenseMutation } from '@/app/api/checkout';
import { useHandleRequest } from '@/hooks';
import toast from 'react-hot-toast';

export const EditReport = ({
  editId,
  amount,
  selectedUser,
  commit,
  expense_type,
  fromUser,
}: {
  editId: string;
  amount: string;
  selectedUser?: string;
  commit?: string;
  expense_type: 'for_work' | 'for_salary';
  fromUser?: string;
}) => {
  const { data: getUsers, isLoading: getUsersLoading } = useGetAllUsersQuery({
    roles: ['CEO', 'ADMIN', 'DRIVER', 'SUPPLIER', 'DOUGHMAKER', 'DISPATCHER'],
  });
  const [editExpense, { isLoading: isPending }] = useEditExpenseMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      sum: String(amount),
      user: selectedUser || '',
      reason: commit || '',
    },
  });

  const setId = useState('')[1];
  const [open, setOpen] = useState(false);
  const handleRequest = useHandleRequest();

  const onSubmit = async (data: {
    sum: string;
    user: string;
    reason: string;
  }): Promise<void> => {
    await handleRequest({
      request: async () => {
        const sum = parseInt(data.sum);
        if (isNaN(sum)) {
          throw new Error("Summa to'g'ri formatda emas.");
        }
        const response = await editExpense({
          id: editId,
          body: {
            expense_type,
            amount: Number(data.sum) * 1000,
            fromUser: fromUser as string,
            toUser: selectedUser,
            reason: data.reason,
          },
        }).unwrap();
        return response;
      },
      onSuccess: (data) => {
        toast.success(data.data.message);
        setOpen(false);
        reset();
      },
      onError: (error: any) => {
        toast.error(error.data.message);
      },
    });
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='w-full text-[#1C2C57]'>
        <div
          className='flex items-center gap-2 p-2 px-4 border-b-2 border-[#1C2C57]'
          onClick={() => setOpen(true)}
        >
          <FaRegEdit size={25} />
          <button className='text-[14px] text-[#1C2C57] font-semibold '>
            Tahrirlash
          </button>
        </div>
      </SheetTrigger>
      <SheetContent
        side='bottom'
        className='bg-[#1C2C57] border-none rounded-t-[20px]'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader className='border-2 border-[#FFCC15] rounded-[12px] p-[15px]'>
            <label
              htmlFor='sum'
              className='text-start text-[12px] text-[#FFCC15] font-[600]'
            >
              Summa
            </label>
            <Controller
              name='sum'
              control={control}
              rules={{ required: 'Summa is required' }}
              render={({ field }) => (
                <input
                  type='text'
                  id='sum'
                  className='border border-[#FFCC15] outline-none p-1 rounded-[8px] w-full'
                  {...field}
                />
              )}
            />

            {errors.sum && <span>{errors.sum.message}</span>}

            {!!selectedUser && (
              <>
                <label
                  htmlFor=''
                  className='text-start text-[12px] text-[#FFCC15] font-[600]'
                >
                  Olgan xodim
                </label>
                <Controller
                  name='user'
                  control={control}
                  render={({ field }) => (
                    <SelectUser
                      disabled
                      selectedUser={selectedUser}
                      className='bg-white'
                      userData={getUsers}
                      setId={setId}
                      title='Xodim tanlash'
                      isLoading={getUsersLoading}
                      {...field}
                    />
                  )}
                />
                {errors.user && <span>{errors.user.message}</span>}
              </>
            )}
            {!!commit && (
              <>
                <label
                  htmlFor='reason'
                  className='text-start text-[12px] text-[#FFCC15] font-[600]'
                >
                  Sababi
                </label>
                <Controller
                  name='reason'
                  control={control}
                  render={({ field }) => (
                    <input
                      type='text'
                      disabled
                      id='reason'
                      className='outline-none p-1 rounded-[8px]'
                      {...field}
                    />
                  )}
                />
                {errors.reason && <span>{errors.reason.message}</span>}
              </>
            )}

            <Button
              variant={'greenary'}
              className='text-[16px] font-[600] ml-auto mt-[10px] text-white'
              type='submit'
              disabled={isPending}
            >
              Yuborish
            </Button>
          </SheetHeader>
        </form>
      </SheetContent>
    </Sheet>
  );
};
