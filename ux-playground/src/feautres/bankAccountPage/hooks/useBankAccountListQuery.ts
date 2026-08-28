import { Service } from "@/services"
import type { BankAccountType } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useRemotePagination, useTableSort } from "ux-library"

export function useBankAccountListQuery(type: BankAccountType | "ALL") {
	const sort = useTableSort({
		initialSort: {
			field: "name",
			direction: "asc",
		},
	})

	const pagination = useRemotePagination({
		pageSize: 8,
		totalRecords: 0,
	})

	const query = useQuery({
		queryKey: [
			"bank-accounts",
			type,
			pagination.currentPage,
			pagination.pageSize,
			sort.sort?.field,
			sort.sort?.direction,
		],
		queryFn: async () => {
			console.log("Fetching bank accounts with params:")
			const response = await Service.BankAccount.getAll({
				type: type === "ALL" ? null : (type as BankAccountType),
				pagination: {
					currentPage: pagination.currentPage,
					pageSize: pagination.pageSize,
				},
				sort: {
					field: sort.sort?.field || "name",
					direction: sort.sort?.direction || "asc",
				},
			})

			return response
		},
	})

	useEffect(() => {
		if (query.data) {
			pagination.setTotalRecords(query.data.totalRecords)
		}
	}, [query.data, pagination])

	return { sort, query, pagination }
}
