/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateDriverDebtClientDebtPaymentMutation,
  //   useGetDriverDebtClientDebtPaymentsQuery,
} from "@/app/api";
import { Button, Input } from "@/components";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useHandleRequest } from "@/hooks";

interface FormValues {
  amount: string;
}

export const DollarBottom = ({ setOpen, debt }: { setOpen: any, debt: number }) => {
  const { id } = useParams();
  const [createDriverDebtClientDebtPayment] =
    useCreateDriverDebtClientDebtPaymentMutation();

  // const { data: payments } = useGetDriverDebtClientDebtPaymentsQuery({
  //   id: id as string,
  // });

  //   const total = payments?.reduce((acc, payment) => acc + payment.paidAmount, 0);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      amount: "",
    },
  });

  const handleRequest = useHandleRequest();

  const onSubmit = async (data: FormValues) => {
    handleRequest({
      request: async () => {
        const response = await createDriverDebtClientDebtPayment({
          id: id as string,
          body: {
            amount: Number(data.amount),
          },
        }).unwrap();
        return response;
      },
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-52 relative bg-white/0 rounded-xl outline outline-2 outline-offset-[-2px] outline-yellow-400 mt-8 px-4 py-3">
        <Label className="text-yellow-400">Olingan pul</Label>

        <Controller
          name="amount"
          control={control}
          rules={{ required: "Summani kiriting" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Summa kiriting"
              className="bg-white border border-yellow-400"
            />
          )}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
        )}

        <h4 className="text-white text-sm font-semibold font-['Inter'] leading-none mt-5">
          Qoldiq: {debt}
        </h4>

        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            className="w-28 h-8 pl-7 pr-9 pt-1.5 pb-4 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-start items-start gap-3 text-[#1B2B56] hover:bg-yellow-400"
          >
            Kiritish
          </Button>
        </div>
      </div>
    </form>
  );
};
