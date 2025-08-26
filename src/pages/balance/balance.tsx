import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import {
	useGetAllDoughQuery,
	useGetAllDriverBalansBreadsQuery,
	useGetAllDriverBalansMainQuery,
	useGetAllDriverCashKirimQuery,
} from '@/app/api/balance'
import { useMeQuery } from '@/app/api'

export const Balance = () => {
	const navigate = useNavigate()
	const { data, isLoading, error } = useGetAllDoughQuery()
	const { data: main } = useGetAllDriverBalansMainQuery()
	const { data: breads } = useGetAllDriverBalansBreadsQuery()

	const [timeStrings, setTimeStrings] = useState<string[]>([])

	const { data: me } = useMeQuery()

	// soat:minut:sekund formatida vaqt farqini hisoblash
	const getTimeDiffString = (createdAt: string | null) => {
		if (!createdAt) return '—'

		const now = new Date()
		const created = new Date(createdAt)
		let diff = Math.floor((now.getTime() - created.getTime()) / 1000) // sekundlarda

		const hours = String(Math.floor(diff / 3600)).padStart(2, '0')
		diff %= 3600
		const minutes = String(Math.floor(diff / 60)).padStart(2, '0')
		const seconds = String(diff % 60).padStart(2, '0')

		return `${hours}:${minutes}:${seconds}`
	}

	// vaqtlarni yangilash uchun interval
	useEffect(() => {
		const updateTimes = () => {
			setTimeStrings(
				data?.map(driver => getTimeDiffString(driver.doughCreatedAt)) || []
			)
		}
		updateTimes() // birinchi renderda chaqirish
		const interval = setInterval(updateTimes, 1000) // har sekund yangilash

		return () => clearInterval(interval)
	}, [data])

	const today = format(new Date(), 'yyyy-MM-dd')

	const { data: kirim } = useGetAllDriverCashKirimQuery({
		startDate: today,
		endDate: today,
	})

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error loading drivers</p>
	return (
		<div className=' bg-[#13255c] flex flex-col min-h-screen'>
			<div className=' bg-[#13255c] flex flex-col'>
				<div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57]  fixed top-0 w-full p-6'>
					<div className='flex items-center'>
						<img
							src='https://github.com/shadcn.png'
							alt='@shadcn'
							className='w-10 h-10 rounded-full'
						/>
						<p className='text-[24px] font-semibold text-white  ml-10'>
							{me?.fullName}
						</p>
					</div>
				</div>
			</div>
			<div
				dir='ltr'
				data-orientation='horizontal'
				className='w-full pb-16 mt-28 mb-6 bg-[#13255c] '
			>
				<div
					data-state='active'
					data-orientation='horizontal'
					role='tabpanel'
					aria-labelledby='radix-:r4u:-trigger-for-work'
					id='radix-:r4u:-content-for-work'
					className=' ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
				>
					<div>
						<div className='space-y-4 px-5'>
							<div
								className='rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'
								onClick={() => navigate('/trade')}
							>
								<h1>Savdo</h1>
								<div className='flex items-center gap-x-2'>
									<p className='text-green-600'>{main?.savdo}</p>
									<button
										type='button'
										aria-haspopup='dialog'
										aria-expanded='false'
										aria-controls='radix-:r51:'
										data-state='closed'
									>
										<svg
											width='22'
											height='22'
											viewBox='0 0 22 22'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.659 11.0001C15.659 11.6418 15.4227 12.2834 14.959 12.7693L9.25398 18.7459C9.00023 19.0118 8.58023 19.0118 8.32648 18.7459C8.07273 18.4801 8.07273 18.0401 8.32648 17.7743L14.0315 11.7976C14.4515 11.3576 14.4515 10.6426 14.0315 10.2026L8.32648 4.22594C8.07273 3.9601 8.07273 3.5201 8.32648 3.25427C8.58023 2.98844 9.00023 2.98844 9.25398 3.25427L14.959 9.23094C15.4227 9.71677 15.659 10.3584 15.659 11.0001Z'
												fill='#1C2C57'
											/>
										</svg>
									</button>
								</div>
							</div>
							<div className='rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'>
								<h1>Qarzlar</h1>
								<div className='flex items-center gap-x-2'>
									<h1 className='text-red-600'>{main?.qarzlar}</h1>
								</div>
							</div>
							<div
								className='rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'
								onClick={() => navigate('/balance/income')}
							>
								<h1>Kirim</h1>
								<div className='flex items-center gap-x-2'>
									<h1>
										{kirim?.reduce((sum, kirim) => sum + kirim.amount, 0)}{' '}
									</h1>
									<button
										type='button'
										aria-haspopup='dialog'
										aria-expanded='false'
										aria-controls='radix-:r51:'
										data-state='closed'
									>
										<svg
											width='22'
											height='22'
											viewBox='0 0 22 22'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.659 11.0001C15.659 11.6418 15.4227 12.2834 14.959 12.7693L9.25398 18.7459C9.00023 19.0118 8.58023 19.0118 8.32648 18.7459C8.07273 18.4801 8.07273 18.0401 8.32648 17.7743L14.0315 11.7976C14.4515 11.3576 14.4515 10.6426 14.0315 10.2026L8.32648 4.22594C8.07273 3.9601 8.07273 3.5201 8.32648 3.25427C8.58023 2.98844 9.00023 2.98844 9.25398 3.25427L14.959 9.23094C15.4227 9.71677 15.659 10.3584 15.659 11.0001Z'
												fill='#1C2C57'
											/>
										</svg>
									</button>
								</div>
							</div>
							<div className='rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'>
								<h1>Xarajatlar</h1>
								<div className='flex items-center gap-x-2'>
									<h1 className='text-red-600'>{main?.xarajatlar}</h1>
								</div>
							</div>
							<div className='rounded-[8px] px-[20px] p-[10px] border-[1px] border-[#FFCC15] bg-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'>
								<h1>Balans</h1>
								<div className='flex items-center gap-x-2'>
									<h1>{main?.balans}</h1>
								</div>
							</div>

							<Accordion type='single' collapsible className='w-full'>
								<AccordionItem value='item-1'>
									<AccordionTrigger className=' rounded-[8px] bg-white p-2.5 px-[20px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold w-full '>
										<h1>Nonlar</h1>
										<div className='ml-auto'>
											<h1>
												{breads?.reduce((sum, bread) => sum + bread.count, 0)}
											</h1>
										</div>
									</AccordionTrigger>
									<AccordionContent className='flex flex-col gap-2 mt-2'>
										<div className='rounded-[8px] bg-white  border-[1px] border-[#FFCC15] flex flex-col items-center justify-between text-[14px] text-[#1C2C57] font-semibold w-full'>
											{breads?.map(bread => (
												<div key={bread.doughType} className='w-full'>
													<div className='rounded-[8px] bg-white px-[20px] py-[10px] flex justify-between items-center text-[14px] text-[#1C2C57] font-semibold w-full'>
														<h1 className='text-left'>{bread?.breadTitle}</h1>
														<span className='text-right'>{bread?.count}</span>
													</div>
													<Separator />
												</div>
											))}

											<Separator />
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible className='w-full'>
								<AccordionItem value='item-2'>
									<AccordionTrigger className=' rounded-[8px] bg-white p-2.5 px-[20px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold w-full '>
										<h1>Xamirlar</h1>
										<div className='ml-auto'>
											<h1>
												{data?.reduce((sum, driver) => sum + driver.count, 0)}
											</h1>
										</div>
									</AccordionTrigger>
									<AccordionContent className='flex flex-col gap-2 mt-2'>
										<div className='rounded-[8px] bg-white  border-[1px] border-[#FFCC15] flex flex-col items-center justify-between text-[14px] text-[#1C2C57] font-semibold w-full'>
											{data?.map((driver, index) => (
												<div
													key={driver._id}
													className='w-full'
													onClick={() =>
														navigate(`/dough-details/${driver._id}`, {
															state: { title: driver.title },
														})
													}
												>
													<div className='rounded-[8px] bg-white px-[20px] py-[10px] flex justify-between items-center text-[14px] text-[#1C2C57] font-semibold w-full'>
														<h1 className='text-left'>{driver.title}</h1>
														<span className='text-center'>
															{timeStrings[index]}
														</span>
														<span className='text-right'>{driver.count}</span>
													</div>
													{index !== data.length - 1 && <Separator />}
												</div>
											))}

											<Separator />
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<div
								className='rounded-[8px] bg-white px-[20px] p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold'
								onClick={() => navigate('/drivers')}
							>
								<h1>Haydovchilar</h1>
								<div className='flex items-center gap-x-2'>
									<button
										type='button'
										aria-haspopup='dialog'
										aria-expanded='false'
										aria-controls='radix-:r51:'
										data-state='closed'
									>
										<svg
											width='22'
											height='22'
											viewBox='0 0 22 22'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.659 11.0001C15.659 11.6418 15.4227 12.2834 14.959 12.7693L9.25398 18.7459C9.00023 19.0118 8.58023 19.0118 8.32648 18.7459C8.07273 18.4801 8.07273 18.0401 8.32648 17.7743L14.0315 11.7976C14.4515 11.3576 14.4515 10.6426 14.0315 10.2026L8.32648 4.22594C8.07273 3.9601 8.07273 3.5201 8.32648 3.25427C8.58023 2.98844 9.00023 2.98844 9.25398 3.25427L14.959 9.23094C15.4227 9.71677 15.659 10.3584 15.659 11.0001Z'
												fill='#1C2C57'
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components";
// import {
//     Chevron,
//     MessagesIcon,
//     MessagesIcons,
//     Notifications,
// } from "@/icons";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DATA = [
//     {
//         id: 2,
//         label: "Qarzlar",
//         value: "8 000 000",
//         color: "text-red-600",
//     },
//     {
//         id: 4,
//         label: "Xarajatlar",
//         value: "3 000 000",
//         color: "text-red-600",
//     },
// ]

// export const Balance = () => {
//     const [open, setOpen] = useState(false);

//     const doughItems = [
//         { name: "Jo’rabayeva", time: "02:44:00", count: 4 },
//         { name: "Bochka", time: "01:11:00", count: 3 },
//     ];

//     const totalCount = doughItems.reduce((sum, item) => sum + item.count, 0);
//     const navigate = useNavigate();

//     return (
//         <div>
//             <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
//                 <div className="flex w-[95%] m-auto justify-between items-center">
//                     <div
//                         className="flex gap-x-2 items-center"
//                         onClick={() => navigate("/profile")}
//                     >
//                         <Avatar>
//                             <AvatarImage
//                                 className="w-10 h-10"
//                                 src="https://github.com/shadcn.png"
//                                 alt="Avatar"
//                             />
//                             <AvatarFallback>Sardor</AvatarFallback>
//                         </Avatar>
//                         <h2 className="text-white text-xl font-semibold font-inter">
//                             Guest
//                         </h2>
//                     </div>
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
//                     onClick={() => navigate("/trade")}
//                     className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
//                 >
//                     <div className="w-full flex items-center justify-between px-6 h-full">
//                         <h2 className="text-blue-950 text-xl font-extrabold">Savdo</h2>
//                         <div className="flex items-center gap-x-2">
//                             <h2 className={`text-xl font-extrabold text-green-700`}>6 000 000</h2>
//                             <Chevron />
//                         </div>
//                     </div>
//                 </div>
//                 <div
//                     onClick={() => navigate("income")}
//                     className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
//                 >
//                     <div className="w-full flex items-center justify-between px-6 h-full">
//                         <h2 className="text-blue-950 text-xl font-extrabold">Kirim</h2>
//                         <div className="flex items-center gap-x-2">
//                             <h2 className={`text-xl font-extrabold text-blue-950`}>10 000 000</h2>
//                             <Chevron />
//                         </div>
//                     </div>
//                 </div>
//                 {DATA.map(({ label, value, color }, index) => (
//                     <div
//                         key={index}
//                         className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden"
//                     >
//                         <div className="w-full flex items-center justify-between px-6 h-full">
//                             <h2 className="text-blue-950 text-xl font-extrabold">{label}</h2>
//                             <div className="flex items-center gap-x-2">
//                                 <h2 className={`text-xl font-extrabold ${color}`}>{value}</h2>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//                 <div className="w-full h-12 bg-yellow-400 rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden">
//                     <div className="w-full flex items-center justify-between px-6 h-full">
//                         <h2 className="text-blue-950 text-xl font-extrabold">Balans</h2>
//                         <h2 className="text-blue-950 text-2xl font-semibold">4 000 000</h2>
//                     </div>
//                 </div>
//                 <Select>
//                     <SelectTrigger className="w-full bg-white border-2 border-[#FFCC15] h-12 px-4 text-blue-950 text-[18px] font-semibold">
//                         <SelectValue placeholder="Nonlar: 850" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             <SelectItem value="chigatoy">Chig’atoy - 500</SelectItem>
//                             <SelectItem value="buxonka">Buxonka - 200</SelectItem>
//                             <SelectItem value="samarqand">Samarqand - 100</SelectItem>
//                             <SelectItem value="patir">Patir - 50</SelectItem>
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//                 <div className="w-full">
//                     <div
//                         onClick={() => setOpen(!open)}
//                         className="w-full h-12 bg-white border-2 border-[#FFCC15] rounded-lg flex justify-between items-center px-4 cursor-pointer"
//                     >
//                         <h2 className="text-blue-950 text-xl font-extrabold">Xamirlar</h2>
//                         <div className="flex items-center gap-2">
//                             <span className="text-blue-950 text-xl font-bold">{totalCount}</span>
//                             {open ? (
//                                 <ChevronUp className="text-blue-950" />
//                             ) : (
//                                 <ChevronDown className="text-blue-950" />
//                             )}
//                         </div>
//                     </div>
//                     {open && (
//                         <div className="mt-2 space-y-2">
//                             {doughItems.map((item, index) => (
//                                 <div
//                                     onClick={() => navigate("/dough-details")}
//                                     key={index}
//                                     className="w-full bg-white border-2 border-[#FFCC15] rounded-lg px-4 py-2 flex justify-between items-center"
//                                 >
//                                     <span className="text-blue-950 font-semibold">{item.name}</span>
//                                     <span className="text-blue-950 font-bold">{item.count}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     <div
//                         onClick={() => navigate("/drivers")}
//                         className="w-full h-12 relative bg-white rounded-lg outline outline-2 outline-offset-[-2px] outline-yellow-400 overflow-hidden mt-5"
//                     >
//                         <div className="w-full flex items-center justify-between px-6 h-full">
//                             <h2 className="text-blue-950 text-xl font-extrabold">Haydovchilar</h2>
//                             <div className="flex items-center gap-x-2">
//                                 <Chevron />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
