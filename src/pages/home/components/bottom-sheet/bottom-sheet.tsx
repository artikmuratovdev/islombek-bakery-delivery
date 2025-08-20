export function SheetSide() {
  // static data
  const reportsFilter = [
    { actual: 120000 },
    { actual: 80000 },
    { actual: 100000 },
  ];

  const orders = [
    { amount: 10, cost: 8000 },
    { amount: 15, cost: 8500 },
    { amount: 20, cost: 8200 },
  ];

  const adminSum = reportsFilter.reduce(
    (sum, item) => sum + (item?.actual || 0),
    0
  );

  const sotuvSum = orders.reduce(
    (sum, item) => sum + (item?.amount * item?.cost || 0),
    0
  );

  return (
    <div>
      <div className="rounded-lg border-[2px] border-[#ffcb15] mt-10 mb-20 bg-white py-2 flex flex-col gap-1">
        {/* Admin qismi */}
        <div className="flex justify-around border-b-[2px] border-[#ffcb15] pb-1.5">
          <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
            Admin
          </h5>
          <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
            {adminSum.toLocaleString("ru-RU")}
          </h5>
        </div>

        {/* Sotuv qismi */}
        <div className="flex justify-around">
          <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
            Sotuv
          </h5>
          <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
            {sotuvSum.toLocaleString("ru-RU")}
          </h5>
        </div>
      </div>
    </div>
  );
}
