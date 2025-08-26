import { useGetAllDriverBalansDriverBreadsQuery } from '@/app/api/balance'
import { useNavigate } from 'react-router-dom'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@radix-ui/react-separator'

export const Drivers = () => {
	const navigate = useNavigate()

	const { data, isLoading, error } = useGetAllDriverBalansDriverBreadsQuery()

	if (isLoading) return <p>Yuklanmoqda...</p>
	if (error) return <p>Xatolik bor</p>

	return (
		<div className='bg-[#13255c] flex flex-col min-h-screen'>
			{/* Header */}
			<div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#13255c] fixed top-0 w-full p-6 z-10'>
				<div className='flex items-center'>
					<span
						className='cursor-pointer'
						onClick={() => navigate('/dashboard/driver/balans')}
					>
						<svg
							width='28'
							height='28'
							viewBox='0 0 28 28'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<rect width='28' height='28' rx='14' fill='#FFCC15' />
							<path
								d='M20.6667 14H7.33337M7.33337 14L12.3334 9M7.33337 14L12.3334 19'
								stroke='#111E2B'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</span>
					<p className='text-[24px] font-semibold text-white ml-10'>
						Haydovchilar
					</p>
				</div>
			</div>

			{/* Body */}
			<div className='w-full px-5 flex flex-col gap-4 mt-32'>
				{data?.map((drive, idx) => (
					<Accordion key={idx} type='single' collapsible className='w-full'>
						<AccordionItem value={`driver-${idx}`}>
							<AccordionTrigger className='rounded-[8px] bg-white p-2.5 px-[20px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold w-full'>
								<h1>{drive.driverName}</h1>
								<div className='ml-auto'>
									<h1>{drive.breadCount}</h1>
								</div>
							</AccordionTrigger>

							<AccordionContent className='flex flex-col gap-2 mt-2'>
								<div className='rounded-[8px] bg-white border-[1px] border-[#FFCC15] flex flex-col items-center justify-between text-[14px] text-[#1C2C57] font-semibold w-full'>
									{drive.driverBreads?.map(bread => (
										<div key={bread.doughType} className='w-full'>
											<div className='rounded-[8px] bg-white px-[20px] py-[10px] flex justify-between items-center text-[14px] text-[#1C2C57] font-semibold w-full'>
												<h1 className='text-left'>{bread.breadTitle}</h1>
												<span className='text-right'>{bread.count}</span>
											</div>
											<Separator />
										</div>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	)
}





// import { Button } from "@/components"
// import { ArrowLeft, MessagesIcon, MessagesIcons, Notifications } from "@/icons"
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const Drivers = () => {
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);

//     const doughItems = [
//         { name: "Chig'atoy", count: 500 },
//         { name: "Buxonka", count: 200 },
//     ];
//     const totalCount = 850;
//     return (
//         <div>
//             <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
//                 <div className="flex w-[95%] m-auto justify-between items-center">
//                     <div
//                         className="flex gap-x-2 items-center"
//                         onClick={() => navigate("/balance")}
//                     >
//                         <Button
//                             onClick={() => navigate("/balance")}
//                             className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
//                         >
//                             <ArrowLeft className="text-2xl" />
//                         </Button>
//                     </div>
//                     <h2 className="text-white text-xl font-semibold font-inter">
//                         Haydovchilar
//                     </h2>
//                     <button onClick={() => navigate("/notifications")}>
//                         <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
//                     </button>
//                 </div>
//             </div>
//             <div className="mt-[30%] w-[95%] m-auto p-[12px] overflow-y-auto h-auto mb-20 flex flex-col gap-y-4">
//                 <div className="flex items-center justify-between">
//                     <button onClick={() => navigate("/message")}>
//                         <MessagesIcon className="w-6 h-6 text-[#FFCC15]" />
//                     </button>
//                     <button onClick={() => navigate("/messages")}>
//                         <MessagesIcons className="w-6 h-6 text-[#FFCC15]" />
//                     </button>
//                 </div>
//                 <div
//                     onClick={() => setOpen(!open)}
//                     className="w-full h-12 bg-white border-2 border-[#FFCC15] rounded-lg flex justify-between items-center px-4 cursor-pointer"
//                 >
//                     <h2 className="text-blue-950 text-xl font-extrabold">Izzat</h2>
//                     <div className="flex items-center gap-2">
//                         <span className="text-blue-950 text-xl font-bold">{totalCount}</span>
//                         {open ? (
//                             <ChevronUp className="text-blue-950" />
//                         ) : (
//                             <ChevronDown className="text-blue-950" />
//                         )}
//                     </div>
//                 </div>
//                 {open && (
//                     <div className=" space-y-2">
//                         {doughItems.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="w-full bg-white border-2 border-[#FFCC15] rounded-lg px-4 py-2 flex justify-between items-center"
//                             >
//                                 <span className="text-blue-950 font-semibold">{item.name}</span>
//                                 <span className="text-blue-950 font-bold">{item.count}</span>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }