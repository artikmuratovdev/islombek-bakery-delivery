// src/redux/api/bakery/types.ts
export interface Driver {
	_id: string
	title: string
	branch: string
	count: number
	doughCreatedAt: string | null
}

// Request param bo‘lishi mumkin
export interface GetAllDoughRequest {
	branchId?: string // agar filtr bo‘lsa
}

// Response array qaytadi
export type GetAllDoughResponse = Driver[]

export interface Dough {
	amount: number
	doughType: string
	limitDoughCount: number
	doughTitle: string
	doughIds: string[]
}

export interface DriverBalansMainResponse {
	savdo: string
	qarzlar: string
	kirim: string
	xarajatlar: string
	balans: string
}

export interface DriverBalansBreadsResponse {
	doughType: string
	breadTitle: string
	count: number
}

export interface DriverBalansDriverBreadsResponse {
driverName:string;
breadCount: string
driverBreads:DriverBalansBreadsResponse[]
}


export interface DriverCashKirim {
	_id:string,
	amount: number,
	title: string,
	branch: string,
	toDriver: string,
	orderId: number,
	status: number,
	createdAt:Date,
	updatedAt:Date,
	type:string
}

export interface DriverCashTime {
	starDate:string,
	endDate:string
}