import { useNavigate } from 'react-router-dom'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import 'react-day-picker/style.css'
import {
	useGetAllDriverCashKirimQuery,
	useGetDriverCashByIdQuery,
} from '@/app/api/balance'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'

export const Income = () => {
	const navigate = useNavigate()

	const [id, setId] = useState<string | null>(null)

	// vaqt va sana
	const [time, setTime] = useState('')
	const [date, setDate] = useState('')

	useEffect(() => {
		const updateTime = () => {
			const options: Intl.DateTimeFormatOptions = {
				timeZone: 'Asia/Tashkent',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			}
			const optionsDate: Intl.DateTimeFormatOptions = {
				timeZone: 'Asia/Tashkent',
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			}
			setTime(new Date().toLocaleTimeString('en-GB', options))
			setDate(new Date().toLocaleDateString('en-GB', optionsDate))
		}

		updateTime()
		const interval = setInterval(updateTime, 1000)
		return () => clearInterval(interval)
	}, [])

	// date range states
	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
	const [tempRange, setTempRange] = useState<DateRange | undefined>()
	const [open, setOpen] = useState(false)

	// query uchun sanalar
	const today = format(new Date(), 'yyyy-MM-dd')

	const startDate = selectedRange?.from
		? format(selectedRange.from, 'yyyy-MM-dd')
		: today
	const endDate = selectedRange?.to
		? format(selectedRange.to, 'yyyy-MM-dd')
		: today

	const { data } = useGetAllDriverCashKirimQuery({ startDate, endDate })

	const {
		data: cashById,
		isLoading,
		error,
	} = useGetDriverCashByIdQuery(id!, {
		skip: !id,
	})

	const formatDate = (createdAt: string) => {
		const date = new Date(createdAt)
		return (
			date.getDate().toString().padStart(2, '0') +
			'.' +
			(date.getMonth() + 1).toString().padStart(2, '0') +
			'.' +
			date.getFullYear()
		)
	}

	const formatTime = (createdAt: string) => {
		const date = new Date(createdAt)
		return (
			date.getHours().toString().padStart(2, '0') +
			':' +
			date.getMinutes().toString().padStart(2, '0') +
			':' +
			date.getSeconds().toString().padStart(2, '0')
		)
	}

	if (isLoading) return <p>Yuklanmoqda...</p>
	if (error) return <p>Xatolik bor</p>

	return (
		<div className='bg-[#13255c] flex flex-col min-h-screen'>
			{/* Header */}
			<div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#13255c] fixed top-0 w-full p-5 z-10'>
				<div className='flex items-center'>
					<span
						className='cursor-pointer'
						onClick={() => navigate('/balance')}
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
					<div className='m-auto'>
						<p className='text-[24px] font-semibold text-white m-auto text-center'>
							Kirim
						</p>
						<p className='text-[24px] font-semibold text-white m-auto text-center'>
							{data?.reduce((sum, kirim) => sum + kirim.amount, 0)}
						</p>
					</div>
				</div>
			</div>

			{/* Time + Calendar */}
			<div className='pt-40 flex ml-auto mr-5'>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<div className='flex items-center gap-4 border border-white rounded-lg py-0.5 px-2 cursor-pointer'>
							<div>
								<p className='text-[14px] font-semibold text-white'>
									{selectedRange?.from && selectedRange?.to
										? selectedRange.from.getTime() ===
										  selectedRange.to.getTime()
											? // agar ikkisi teng bo'lsa
											  format(selectedRange.from, 'yyyy.MM.dd')
											: // agar ikkita turli sana bo'lsa
											  `${format(selectedRange.from, 'yyyy.MM.dd')} - ${format(
													selectedRange.to,
													'yyyy.MM.dd'
											  )}`
										: // agar sana belgilanmagan bo'lsa bugungi sana chiqsin
										  date.split('/').join('.')}
								</p>
								<p className='text-[14px] font-semibold text-white'>{time}</p>
							</div>
							<CalendarIcon className='text-[#FFCC15] w-[23px] h-[22px]' />
						</div>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-4 bg-white rounded-xl shadow-lg'
						align='start'
					>
						<Calendar
							mode='range'
							selected={tempRange}
							onSelect={range => {
								if (range) setTempRange(range)
							}}
							disabled={date => date > new Date()}
							className='text-[#13255c]' // matn ko'k-qora
						/>
						<Button
							onClick={() => {
								setSelectedRange(tempRange)
								setOpen(false)
							}}
							className='mt-3 bg-[#13255c] text-white rounded-lg px-4 py-2 hover:bg-[#0f1d4a]'
						>
							Saqlash
						</Button>
					</PopoverContent>

					{/* <PopoverContent className='w-auto p-2 bg-white' align='start'>
						<Calendar
							mode='range'
							selected={tempRange}
							onSelect={range => {
								if (range) setTempRange(range)
							}}
							disabled={date => date > new Date()}
							className='bg-[#13255c]'
						/>
						<Button
							onClick={() => {
								setSelectedRange(tempRange)
								setOpen(false)
							}}
							variant={'login'}
						>
							Saqlash
						</Button>
					</PopoverContent> */}
				</Popover>
			</div>

			{/* Body */}
			<div className='w-full px-5 flex flex-col gap-4 mt-8'>
				{data?.map(kirim => (
					<div
						className='rounded-[8px] bg-white p-2.5 px-[20px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold w-full'
						key={kirim._id}
						onClick={() => setId(kirim._id)}
					>
						<h1>{kirim?.amount}</h1>
						<div className='ml-auto'>
							<h1>
								{formatDate(`${kirim?.createdAt}`)}{' '}
								{formatTime(`${kirim?.createdAt}`)}
							</h1>
						</div>
					</div>
				))}

				<Drawer open={!!id} onOpenChange={open => !open && setId(null)}>
					<DrawerContent className='bg-[#293453]'>
						<DrawerHeader>
							<div className='space-y-4 px-5'>
								<div
									className={`rounded-[8px] border-[2px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#13255c] font-bold w-full p-3 ${
										cashById?.type === 'FROM_ORDER'
											? ' bg-white'
											: ' bg-[#FFCC15]'
									}`}
								>
									<h1 className='mr-auto'>{cashById?.amount}</h1>

									<div className='m-auto'>
										<h1>{formatTime(`${cashById?.createdAt}`)}</h1>
									</div>

									<div className='ml-auto'>
										<h1>{formatDate(`${cashById?.createdAt}`)}</h1>
									</div>
								</div>

								<div className='rounded-[8px] bg-white border-[2px] border-[#FFCC15] flex items-center justify-center text-[16px] text-[#13255c] font-bold w-full p-3'>
									<h1>{cashById?.title}</h1>
								</div>
							</div>
						</DrawerHeader>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button
									variant={'kirim'}
									className='w-1/6 m-auto my-5 mt-11'
									onClick={() => setId(null)}
								>
									Yopish
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	)
}

// import { useNavigate } from 'react-router-dom'
// import {
// 	Drawer,
// 	DrawerClose,
// 	DrawerContent,
// 	DrawerFooter,
// 	DrawerHeader,
// } from '@/components/ui/drawer'
// import 'react-day-picker/style.css'
// import { Button } from '@/components/ui/button'
// import {
// 	useGetAllDriverCashKirimQuery,
// 	useGetDriverCashByIdQuery,
// } from '@/app/api/balance'
// import { useEffect, useState } from 'react'
// import { format } from 'date-fns'
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from '@/components/ui/popover'
// import { CalendarIcon } from 'lucide-react'
// import { Calendar } from '@/components/ui/calendar'
// import type { DateRange } from 'react-day-picker'

// export const Income = () => {
// 	const navigate = useNavigate()

// 	const [id, setId] = useState<string | null>(null)

// 	// vaqt va sana
// 	const [time, setTime] = useState('')
// 	const [date, setDate] = useState('')

// 	useEffect(() => {
// 		const updateTime = () => {
// 			const options: Intl.DateTimeFormatOptions = {
// 				timeZone: 'Asia/Tashkent',
// 				hour: '2-digit',
// 				minute: '2-digit',
// 				second: '2-digit',
// 				hour12: false,
// 			}
// 			const optionsDate: Intl.DateTimeFormatOptions = {
// 				timeZone: 'Asia/Tashkent',
// 				day: '2-digit',
// 				month: '2-digit',
// 				year: 'numeric',
// 			}
// 			setTime(new Date().toLocaleTimeString('en-GB', options))
// 			setDate(new Date().toLocaleDateString('en-GB', optionsDate))
// 		}

// 		updateTime()
// 		const interval = setInterval(updateTime, 1000)
// 		return () => clearInterval(interval)
// 	}, [])

// 	// date range states
// 	const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()
// 	const [tempRange, setTempRange] = useState<DateRange | undefined>()
// 	const [open, setOpen] = useState(false)

// 	// query uchun sanalar
// 	const today = format(new Date(), 'yyyy-MM-dd')

// 	const startDate = selectedRange?.from
// 		? format(selectedRange.from, 'yyyy-MM-dd')
// 		: today
// 	const endDate = selectedRange?.to
// 		? format(selectedRange.to, 'yyyy-MM-dd')
// 		: today

// 	const { data } = useGetAllDriverCashKirimQuery({ startDate, endDate })

// 	const {
// 		data: cashById,
// 		isLoading,
// 		error,
// 	} = useGetDriverCashByIdQuery(id!, {
// 		skip: !id,
// 	})

// 	const formatDate = (createdAt: string) => {
// 		const date = new Date(createdAt)
// 		return (
// 			date.getDate().toString().padStart(2, '0') +
// 			'.' +
// 			(date.getMonth() + 1).toString().padStart(2, '0') +
// 			'.' +
// 			date.getFullYear()
// 		)
// 	}

// 	const formatTime = (createdAt: string) => {
// 		const date = new Date(createdAt)
// 		return (
// 			date.getHours().toString().padStart(2, '0') +
// 			':' +
// 			date.getMinutes().toString().padStart(2, '0') +
// 			':' +
// 			date.getSeconds().toString().padStart(2, '0')
// 		)
// 	}

// 	if (isLoading) return <p>Yuklanmoqda...</p>
// 	if (error) return <p>Xatolik bor</p>

// 	return (
// 		<div className='bg-[#13255c] flex flex-col min-h-screen'>
// 			{/* Header */}
// 			<div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#13255c] fixed top-0 w-full p-5 z-10'>
// 				<div className='flex items-center'>
// 					<span
// 						className='cursor-pointer'
// 						onClick={() => navigate('/balance')}
// 					>
// 						<svg
// 							width='28'
// 							height='28'
// 							viewBox='0 0 28 28'
// 							fill='none'
// 							xmlns='http://www.w3.org/2000/svg'
// 						>
// 							<rect width='28' height='28' rx='14' fill='#FFCC15' />
// 							<path
// 								d='M20.6667 14H7.33337M7.33337 14L12.3334 9M7.33337 14L12.3334 19'
// 								stroke='#111E2B'
// 								strokeWidth='1.5'
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 							/>
// 						</svg>
// 					</span>
// 					<div className='m-auto'>
// 						<p className='text-[24px] font-semibold text-white m-auto text-center'>
// 							Kirim
// 						</p>
// 						<p className='text-[24px] font-semibold text-white m-auto text-center'>
// 							{data?.reduce((sum, kirim) => sum + kirim.amount, 0)}
// 						</p>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Time + Calendar */}
// 			<div className=' flex ml-auto mr-5 mt-40'>
// 				<Popover open={open} onOpenChange={setOpen}>
// 					<PopoverTrigger asChild>
// 						<div className='flex items-center gap-4 border-2 border-[#FFCC15] rounded-lg py-0.5 px-2 cursor-pointer'>
// 							<div>
// 								<p className='text-[14px] font-semibold text-white'>
// 									{selectedRange?.from && selectedRange?.to
// 										? selectedRange.from.getTime() ===
// 										  selectedRange.to.getTime()
// 											? // agar ikkisi teng bo'lsa
// 											  format(selectedRange.from, 'yyyy.MM.dd')
// 											: // agar ikkita turli sana bo'lsa
// 											  `${format(selectedRange.from, 'yyyy.MM.dd')} - ${format(
// 													selectedRange.to,
// 													'yyyy.MM.dd'
// 											  )}`
// 										: // agar sana belgilanmagan bo'lsa bugungi sana chiqsin
// 										  date.split('/').join('.')}
// 								</p>
// 								<p className='text-[14px] font-semibold text-white'>{time}</p>
// 							</div>
// 							<CalendarIcon className='text-[#FFCC15] w-[23px] h-[22px]' />
// 						</div>
// 					</PopoverTrigger>
// 					<PopoverContent className='w-auto p-2 bg-white' align='start'>
// 						<Calendar
// 							mode='range'
// 							selected={tempRange}
// 							onSelect={range => {
// 								if (range) setTempRange(range)
// 							}}
// 							disabled={date => date > new Date()}
// 							className='bg-[#13255c]'
// 						/>
// 						<Button
// 							onClick={() => {
// 								setSelectedRange(tempRange)
// 								setOpen(false)
// 							}}
// 							className='bg-[#15255c] text-white rounded-[10px] cursor-pointer'
// 						>
// 							Saqlash
// 						</Button>
// 					</PopoverContent>
// 				</Popover>
// 			</div>

// 			{/* Body */}
// 			<div className='w-full px-5 flex flex-col gap-4 mt-8'>
// 				{data?.map(kirim => (
// 					<div
// 						className='rounded-[8px] bg-white p-2.5 px-[20px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-bold w-full'
// 						key={kirim._id}
// 						onClick={() => setId(kirim._id)}
// 					>
// 						<h1>{kirim?.amount}</h1>
// 						<div className='ml-auto'>
// 							<h1>
// 								{formatDate(`${kirim?.createdAt}`)}{' '}
// 								{formatTime(`${kirim?.createdAt}`)}
// 							</h1>
// 						</div>
// 					</div>
// 				))}

// 				<Drawer open={!!id} onOpenChange={open => !open && setId(null)}>
// 					<DrawerContent className='bg-[#293453]'>
// 						<DrawerHeader>
// 							<div className='space-y-4 px-5'>
// 								<div
// 									className={`rounded-[8px] border-[2px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#13255c] font-bold w-full p-3 ${
// 										cashById?.type === 'FROM_ORDER'
// 											? ' bg-white'
// 											: ' bg-[#FFCC15]'
// 									}`}
// 								>
// 									<h1 className='mr-auto'>{cashById?.amount}</h1>

// 									<div className='m-auto'>
// 										<h1>{formatTime(`${cashById?.createdAt}`)}</h1>
// 									</div>

// 									<div className='ml-auto'>
// 										<h1>{formatDate(`${cashById?.createdAt}`)}</h1>
// 									</div>
// 								</div>

// 								<div className='rounded-[8px] bg-white border-[2px] border-[#FFCC15] flex items-center justify-center text-[16px] text-[#13255c] font-bold w-full p-3'>
// 									<h1>{cashById?.title}</h1>
// 								</div>
// 							</div>
// 						</DrawerHeader>
// 						<DrawerFooter>
// 							<DrawerClose asChild>
// 								<Button
// 									variant={'kirim'}
// 									className='w-1/6 m-auto my-5 mt-11'
// 									onClick={() => setId(null)}
// 								>
// 									Yopish
// 								</Button>
// 							</DrawerClose>
// 						</DrawerFooter>
// 					</DrawerContent>
// 				</Drawer>
// 			</div>
// 		</div>
// 	)
// }

// import { Button } from "@/components";
// import { UZBTime } from "@/components/common/uzb-time";
// import { ArrowLeft, Notifications } from "@/icons";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IncomeBottom, Incomes } from "./components";
// import { BottomSheet } from "@/components/common";

// export const Income = () => {
//   const navigate = useNavigate();
//   const [openBottomsheet, setOpenBottomsheet] = useState(false);
//   const [openBottom, setOpenBottom] = useState(false);
//   return (
//     <div>
//       <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10">
//         <div className="flex w-[95%] m-auto justify-between items-center">
//           <div
//             className="flex gap-x-2 items-center"
//             onClick={() => navigate("/balance")}
//           >
//             <Button
//               onClick={() => navigate("/balance")}
//               className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full"
//             >
//               <ArrowLeft className="text-2xl" />
//             </Button>
//           </div>
//           <div>
//             <h2 className="text-white text-xl font-semibold font-inter">
//               Kirim
//             </h2>
//             <h2 className="text-white text-xl font-semibold font-inter">
//               5 000 000
//             </h2>
//           </div>
//           <button onClick={() => navigate("/notifications")}>
//             <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
//           </button>
//         </div>
//       </div>
//       <div className="mt-[27%] w-[100%] flex justify-end px-6">
//         <UZBTime />
//       </div>
//       <div className="px-4 mt-10 space-y-4">
//         <div
//           className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6"
//           onClick={() => setOpenBottom(true)}
//         >
//           <h2 className="text-green-700 text-base font-semibold font-['Inter']">
//             1 500 000
//           </h2>
//           <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
//             20.03.2025 11:30
//           </h2>
//         </div>
//         <div
//           className="w-full h-9 relative bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6"
//           onClick={() => setOpenBottomsheet(true)}
//         >
//           <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
//             1 500 000
//           </h2>
//           <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
//             20.03.2025 11:30
//           </h2>
//         </div>
//         <div className="w-full h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 flex justify-between items-center px-6">
//           <h2 className="text-green-700 text-base font-semibold font-['Inter']">
//             10 00 000
//           </h2>
//           <h2 className="text-blue-950 text-base font-semibold font-['Inter']">
//             20.03.2025 11:30
//           </h2>
//         </div>
//       </div>
//       <BottomSheet
//         open={openBottomsheet}
//         setOpen={setOpenBottomsheet}
//         children={<IncomeBottom onClose={() => setOpenBottomsheet(false)} />}
//       />
//       <BottomSheet
//         open={openBottom}
//         setOpen={setOpenBottom}
//         children={<Incomes onClose={() => setOpenBottom(false)} />}
//       />
//     </div>
//   );
// };
