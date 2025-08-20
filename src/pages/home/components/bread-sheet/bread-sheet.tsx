export const BreadSheet = () => {
  // Statik bakerylar ro'yxati
  const bakeries = [
    { _id: "1", title: "Toshkent Nonvoyxonasi" },
    { _id: "2", title: "Chorsu Bakery" },
    { _id: "3", title: "Samarqand Nonlari" },
  ];

  // Statik bread count
  const bakeriesBreads: Record<string, number> = {
    "1": 120,
    "2": 85,
    "3": 200,
  };

  return (
    <div>
      <div className="rounded-lg border-[2px] border-[#ffcb15] mt-10 mb-20 bg-white py-2 flex flex-col gap-1">
        {bakeries.map((bakery, index, array) => (
          <div
            key={index}
            className={`grid grid-cols-2 ${
              index !== array.length - 1
                ? "border-b-[2px] border-[#ffcb15] pb-1.5"
                : ""
            }`}
          >
            <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
              {bakery.title}
            </h5>
            <h5 className="text-center text-[#1b2b56] text-base font-semibold font-['Inter']">
              {bakeriesBreads[bakery._id]}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};
