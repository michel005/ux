import { useEffect } from "react"
import { useRemotePagination } from "./useRemotePagination"

export function useLocalPagination<T>(props: { rows: T[]; pageSize: number }) {
	const pagination = useRemotePagination({
		pageSize: props.pageSize,
		totalRecords: props.rows.length,
	})

	useEffect(() => {
		pagination.firstPage()
	}, [props.rows])

	return {
		...pagination,
		local: true,
		slice: props.rows.slice(
			(pagination.currentPage - 1) * pagination.pageSize,
			(pagination.currentPage - 1) * pagination.pageSize + pagination.pageSize,
		) as T[],
	}
}
