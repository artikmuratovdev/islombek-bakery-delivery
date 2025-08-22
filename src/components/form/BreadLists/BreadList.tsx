import { breadInfo } from '@/app/api/orderApi/types';
import { useState } from 'react';
import BreadPrices from './BreadPrices';

type BreadListProps = {
  breadPrices: breadInfo[];
  setBreads: React.Dispatch<React.SetStateAction<breadInfo[]>>;
  priceHide?: boolean
};

const BreadList = ({ breadPrices, setBreads ,priceHide}: BreadListProps) => {
  const [totals, setTotals] = useState<Record<string, number>>({});

  const handleTotalChange = (id: string, value: number) => {
    setTotals((prev) => ({...prev,[id]: Number(value) || 0,}));
  };

  // Safely calculate grand total
  const grandTotal = Object.values(totals).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );

  return (
    <div>
      <div className='mt-5 flex flex-col gap-y-2'>
        {breadPrices.map((bread) => (
          <BreadPrices
            priceHide={priceHide}
            key={bread._id}
            bread={bread}
            onChange={handleTotalChange}
            setBreads={setBreads}
          />
        ))}
      </div>

      <div className='mt-4 text-white text-2xl font-semibold'>
        Umumiy: {grandTotal.toLocaleString('ru-RU')} so'm
      </div>
    </div>
  );
};

export default BreadList;
