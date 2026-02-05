import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Edit } from '@/icons';
import { Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { breadInfo } from '@/app/api/orderApi/types';
import { formatNumberWithSpaces } from '@/utils';

type Props = {
  bread: breadInfo;
  onChange: (id: string, value: number) => void;
  setBreads: React.Dispatch<React.SetStateAction<breadInfo[]>>;
  priceHide?: boolean;
  hideAmount?: boolean;
};

const BreadPrices = forwardRef(function BreadPrices(
  { bread, onChange, setBreads, priceHide, hideAmount }: Props,
  ref
) {
  const [count, setCount] = useState<number>(bread.amount ?? 0);
  const [price, setPrice] = useState<number>(bread.breadSoldPrice ?? 0);
  const [priceVisible, setPriceVisible] = useState(false);

  const priceInputRef = useRef<HTMLInputElement>(null);
  const countInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      priceInputRef.current?.focus();
    },
  }));

  // Sync local state if external bread props change
  useEffect(() => {
    if (bread.amount !== count) {
      setCount(bread.amount ?? 0);
    }
  }, [bread.amount]);

  useEffect(() => {
    if (bread.breadSoldPrice !== price) {
      setPrice(bread.breadSoldPrice ?? 0);
    }
  }, [bread.breadSoldPrice]);

  useEffect(() => {
    if (price <= 0) {
      onChange(bread._id, 0);
      return;
    }

    const total = count * price;
    onChange(bread._id, total);

    setBreads((prev) => {
      const index = prev.findIndex((b) => b._id === bread._id);

      if (index !== -1) {
        const existing = prev[index];
        if (existing.amount === count && existing.breadSoldPrice === price) {
          return prev;
        }

        const updated = [...prev];
        updated[index] = {
          ...existing,
          breadSoldPrice: price,
          amount: count,
        };
        return updated;
      }

      return [
        ...prev,
        {
          ...bread,
          breadSoldPrice: price,
          amount: count,
        },
      ];
    });
  }, [count, price]);

  // Handle outside click to close inputs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setPriceVisible(false);
        priceInputRef.current?.blur();
        countInputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setPriceVisible((visible) => {
      const newState = !visible;
      if (!newState) {
        priceInputRef.current?.blur();
      } else {
        setTimeout(() => priceInputRef.current?.focus(), 0);
      }
      return newState;
    });
  };

  return (
    <div
      ref={wrapperRef}
      className='grid grid-cols-5 gap-5 bg-white rounded-lg px-3 py-2'
    >
      <h3 className='text-blue-950 font-semibold col-span-2'>{bread.title}</h3>

      <div className='text-blue-950 font-semibold flex gap-2 justify-center'>
        {!priceVisible && <p>{formatNumberWithSpaces(price)}</p>}

        <input
          ref={priceInputRef}
          type='text'
          value={formatNumberWithSpaces(price ?? 0)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/\s/g, ''));
            setPrice(isNaN(val) ? 0 : val);
          }}
          className={`max-w-[80px] ${
            priceVisible ? 'block' : 'hidden'
          } border border-[#FFCC15] transition-all duration-200`}
        />

        {!priceHide && (
          <span onClick={handleEditClick}>
            <Edit className='text-yellow cursor-pointer' />
          </span>
        )}
      </div>

      <div className='text-blue-950 font-semibold flex items-center justify-center gap-2 col-span-2'>
        {!hideAmount && <Minus
          className='bg-primary text-[#FFCC15] w-6 aspect-square rounded-lg p-0.5 cursor-pointer'
          onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
        />}
        

        {!hideAmount ? (
          <input
          ref={countInputRef}
          type='text'
          value={formatNumberWithSpaces(count ?? 0)}
          onChange={(e) => {
            const value = Number(e.target.value.replace(/\s/g, ''));
            setCount(isNaN(value) ? 0 : Math.max(value, 0));
          }}
          className='w-10 text-center border border-[#FFCC15] rounded bg-white'
        />
        ) : (
          <p className='w-10 text-center border border-[#FFCC15] rounded bg-white'>{formatNumberWithSpaces(count)}</p>
        )}
        {!hideAmount && (
          <Plus
            className='bg-primary text-[#FFCC15] w-6 aspect-square rounded-lg p-0.5 cursor-pointer'
            onClick={() => {
              if (price > 0) {
                setCount((prev) => prev + 1);
              } else {
                toast.error('Narx nol bo‘lishi mumkin emas');
              }
            }}
          />
        )}
      </div>
    </div>
  );
});

export default BreadPrices;
