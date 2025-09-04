import { API_TAGS } from '@/constants'
import { baseApi } from '../base-api/base-api'
import { PATHS } from './path'

import type {
	Dough,
	DriverBalansBreadsResponse,
	DriverBalansDriverBreadsResponse,
	DriverBalansMainResponse,
	DriverCashKirim,
	GetAllDoughRequest,
	GetAllDoughResponse,
} from './type'

export const driverBalansApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getAllDriverBalansMain: build.query<DriverBalansMainResponse, void>({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const response = await fetchWithBQ({
					url: PATHS.DRIVER_BALANS_MAIN,
					method: 'GET',
				})
				if (response.error) {
					return { error: response.error }
				}
				return { data: response.data as DriverBalansMainResponse }
			},
			providesTags: [API_TAGS.BALANCE],
		}),

		getAllDriverBalansBreads: build.query<DriverBalansBreadsResponse[], void>({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const response = await fetchWithBQ({
					url: PATHS.DRIVER_BALANS_BREADS,
					method: 'GET',
				})
				if (response.error) {
					return { error: response.error }
				}
				return { data: response.data as DriverBalansBreadsResponse[] }
			},
			providesTags: [API_TAGS.BALANCE],
		}),

		getAllDriverBalansDriverBreads: build.query<
			DriverBalansDriverBreadsResponse[],
			void
		>({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const response = await fetchWithBQ({
					url: PATHS.DRIVER_BALANS_DRIVER_BREADS,
					method: 'GET',
				})
				if (response.error) {
					return { error: response.error }
				}
				return { data: response.data as DriverBalansDriverBreadsResponse[] }
			},
			providesTags: [API_TAGS.BALANCE],
		}),

		getAllDough: build.query<GetAllDoughResponse, GetAllDoughRequest | void>({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				const response = await fetchWithBQ({
					url: PATHS.DRIVER_BALANS_GETALL,
					method: 'GET',
				})
				if (response.error) {
					return { error: response.error }
				}
				return { data: response.data as GetAllDoughResponse }
			},
			providesTags: [API_TAGS.BALANCE],
		}),

		getDoughById: build.query<Dough[], string>({
			query: id => `${PATHS.DRAVER_DOUGH_ID}/${id}/take-dough-info`,
			providesTags: [API_TAGS.BALANCE],
		}),

		updateDoughAmount: build.mutation({
			query: ({ id, doughs }) => {
				return {
					url: `/driver-balans/${id}/take-dough`,
					method: 'PATCH',
					body: {
						doughs: doughs.map((d: Dough) => ({
							doughType: d.doughType,
							amount: d.amount,
							limitDoughCount: d.limitDoughCount,
							doughTitle: d.doughTitle,
							doughIds: d.doughIds, // ❗ backend shuni kutyapti
						})),
					},
				}
			},
			invalidatesTags:[API_TAGS.BALANCE]
		}),

		getAllDriverCashKirim: build.query<
			DriverCashKirim[],
			{ startDate?: string; endDate?: string } | void
		>({
			query: ({ startDate, endDate } = {}) => {
				let url = `${PATHS.DRIVER_CASH}/kirim`
				if (startDate && endDate) {
					url += `?startDate=${startDate}&endDate=${endDate}`
				}
				return url
			},
			providesTags:[API_TAGS.BALANCE]
		}),

		getDriverCashById: build.query<DriverCashKirim, string>({
			query: id => `${PATHS.DRIVER_CASH}/kirim/${id}`,
			providesTags: [API_TAGS.KIRIM],
		}),
	}),
})

export const {
	useGetAllDriverBalansMainQuery,
	useGetAllDriverBalansBreadsQuery,
	useGetAllDriverBalansDriverBreadsQuery,
	useGetAllDoughQuery,
	useGetDoughByIdQuery,
	useUpdateDoughAmountMutation,
	useGetAllDriverCashKirimQuery,
	useGetDriverCashByIdQuery,
} = driverBalansApi
