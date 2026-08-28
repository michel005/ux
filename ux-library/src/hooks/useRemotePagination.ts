import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

export function useRemotePagination(props: {
	totalRecords: number
	pageSize: number
	pageSizeOptions?: number[]
}) {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalRecords, setTotalRecords] = useState<number>(props.totalRecords)
	const [pageSize, setPageSize] = useState<number>(props.pageSize)
	const pageSizeOptions = props.pageSizeOptions || [5, 10, 20, 50]

	useEffect(() => {
		setTotalRecords(props.totalRecords)
	}, [props.totalRecords])

	const pageCount = Math.ceil(totalRecords / pageSize)

	const setPageSizeFunction: Dispatch<SetStateAction<number>> = (...props) => {
		setCurrentPage(1)
		setPageSize(...props)
	}

	const setTotalRecordsFunction: Dispatch<SetStateAction<number>> = (
		...props
	) => {
		setTotalRecords(...props)
	}

	return {
		local: false,
		currentPage,
		pageCount,
		pageSizeOptions,
		pageSize,
		totalRecords,
		setTotalRecords: setTotalRecordsFunction,
		setPageSize: setPageSizeFunction,
		disableNext: currentPage === pageCount,
		disablePrevious: currentPage === 1,
		nextPage: () => {
			setCurrentPage(currentPage + 1)
		},
		previousPage: () => {
			setCurrentPage(currentPage - 1)
		},
		firstPage: () => {
			setCurrentPage(1)
		},
		lastPage: () => {
			setCurrentPage(pageCount)
		},
	}
}
