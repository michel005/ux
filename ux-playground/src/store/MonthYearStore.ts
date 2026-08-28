import { create } from "zustand"

export interface MonthYearStateProps {
	month: number
	year: number
	getStartDate: () => Date
	getEndDate: () => Date
	next: () => void
	previous: () => void
	setMonthYear: (month: number, year: number) => void
}

export const MonthYearStore = create<MonthYearStateProps>((set) => ({
	month: new Date().getMonth() + 1,
	year: new Date().getFullYear(),
	getStartDate: () =>
		new Date(
			MonthYearStore.getState().year,
			MonthYearStore.getState().month - 1,
			1,
		),
	getEndDate: () =>
		new Date(
			MonthYearStore.getState().year,
			MonthYearStore.getState().month,
			0,
		),
	next: () =>
		set((state) => {
			const nextMonth = state.month === 12 ? 1 : state.month + 1
			const nextYear = state.month === 12 ? state.year + 1 : state.year
			return { month: nextMonth, year: nextYear }
		}),
	previous: () =>
		set((state) => {
			const prevMonth = state.month === 1 ? 12 : state.month - 1
			const prevYear = state.month === 1 ? state.year - 1 : state.year
			return { month: prevMonth, year: prevYear }
		}),
	setMonthYear: (month: number, year: number) => set({ month, year }),
}))
