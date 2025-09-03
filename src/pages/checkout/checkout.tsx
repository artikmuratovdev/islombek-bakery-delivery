import { ArrowLeft } from '@/icons';
import { Link} from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { ForWork, Salary } from './components';
import { useGetAllExpenseQuery } from '@/app/api/checkout';
import { GetExpensesResponse } from '@/app/api/checkout/types';
import { AddReport } from './components/addReport';
import { CloseCheckout } from './components/CloseCheckout';
import { useMeQuery } from '@/app/api';
import { useEffect } from 'react';

export const Checkout = () => {
  const {data:me , refetch : meRefetch} = useMeQuery();
  const { data: expenses , refetch} = useGetAllExpenseQuery(me?._id as string, {
    skip: !me?._id
  });

  useEffect(() => {
    meRefetch();
  },[expenses])

  const for_work = expenses?.filter(
    (expense) => expense.expense_type === 'for_work' && expense
  );
  const for_salary = expenses?.filter(
    (expense) => expense.expense_type === 'for_salary' && expense
  );
  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full'>
        <div className='flex justify-between items-center'>
          <Link to={'/'}>
            <ArrowLeft className='bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer scale-125' />
          </Link>
          <h3 className='text-white mx-auto text-xl font-bold'>Kassa hisoboti</h3>
        </div>
      </div>
      <div className='mt-24 px-4'>
        <div className='mt-[70px]'>
          <div className='rounded-[8px] bg-white p-3 px-5 border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-[600]'>
            <p>Balance</p>
            <p>{Number(me?.balance).toLocaleString('ru-RU')}</p>
          </div>
        </div>
        <Tabs defaultValue='for-work' className='w-full mt-8'>
          <TabsList className='grid grid-cols-2 bg-white text-[15px] font-[700] text-[#1C2C57] mb-11'>
            <TabsTrigger value='for-work' className='py-[7px]'>
              Ish uchun
            </TabsTrigger>
            <TabsTrigger value='salary' className='py-[7px]'>
              Ish haqi
            </TabsTrigger>
          </TabsList>
          <TabsContent value='for-work'>
            <ForWork items={for_work as GetExpensesResponse[]} />
          </TabsContent>
          <TabsContent value='salary'>
            <Salary items={for_salary as GetExpensesResponse[]} />
          </TabsContent>
        </Tabs>
        <AddReport refetch={refetch} />
        <CloseCheckout />
      </div>
    </div>
  );
};
