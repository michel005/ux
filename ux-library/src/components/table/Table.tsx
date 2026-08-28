import clsx from "clsx"
import {
	useEffect,
	useRef,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react"
import {
	useLocalPagination,
	useRemotePagination,
	useTableSelection,
} from "../../hooks"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"
import { Pagination, type PaginationProps } from "../pagination/Pagination"
import { Skeleton } from "../skeleton/Skeleton"
import style from "./Table.module.scss"

export interface TableColumnProps<T, K extends string> {
	align?: "left" | "center" | "right"
	type?: "string" | "number" | "date" | "domain"
	domain?: Record<string, string>
	field: K
	header?: string
	render?: (row: T) => ReactNode
	sortContent?: (row: T) => string | number | Date
	sort?: boolean
	width?: string
}

export type LocalPaginationProps<T> = ReturnType<typeof useLocalPagination<T>>

export type RemotePaginationProps = ReturnType<typeof useRemotePagination>

export interface TableProps<T, K extends string> {
	showHeader?: boolean
	getIdValue: (row: T) => string
	columns: TableColumnProps<T, K>[]
	loading?: boolean
	rows?: T[]
	pagination?: LocalPaginationProps<T> | RemotePaginationProps
	paginationVariant?: PaginationProps<T>["variant"]
	selection?: ReturnType<typeof useTableSelection>
	sort?: {
		sort?: {
			field: K
			direction: "asc" | "desc"
		}
		setSort?: Dispatch<
			SetStateAction<{
				field: K
				direction: "asc" | "desc"
			}>
		>
	}
	zebra?: boolean
	localization?: {
		showingXofYRows?: (x: number, y: number) => string
		noRecordsFound?: string
		clearSelection?: string
		firstPage?: string
		previousPage?: string
		nextPage?: string
		lastPage?: string
	}
}

export function Table<T, K extends string>(props: TableProps<T, K>) {
	const selectAllRef = useRef<HTMLInputElement>(null)
	const showHeader = props.showHeader ?? true

	const getAlignClass = (align?: TableColumnProps<T, K>["align"]) => {
		if (align === "center") return style.alignCenter
		if (align === "right") return style.alignRight
		return style.alignLeft
	}

	const rows: T[] =
		props.pagination && props.pagination.local
			? ((props.pagination as ReturnType<typeof useLocalPagination>)
					?.slice as T[]) || []
			: props.rows || []

	useEffect(() => {
		if (selectAllRef.current && props.selection) {
			const selectedCount = rows.filter((x) =>
				props.selection?.selected.includes(props.getIdValue(x)),
			).length
			selectAllRef.current.indeterminate =
				selectedCount > 0 && selectedCount < rows.length
		}
	}, [rows, props.selection?.selected, props.getIdValue])

	const columnsTemplate = `${rows.length > 0 && props.selection ? "1rem" : ""} ${props.columns.map((x) => x.width || "auto").join(" ")}`

	return (
		<div className={clsx(style.table, props.zebra && style.zebra)}>
			<div className={style.content}>
				{showHeader && (
					<header
						style={{
							gridTemplateColumns: columnsTemplate,
						}}
					>
						{rows.length > 0 && props.selection && (
							<input
								type="checkbox"
								ref={selectAllRef}
								checked={
									!rows.find(
										(x) =>
											!props.selection?.selected.includes(props.getIdValue(x)),
									)
								}
								onChange={(e) => {
									if (e.target.checked) {
										rows.forEach((x) => {
											props.selection?.select(props.getIdValue(x))
										})
									} else {
										rows.forEach((x) => {
											props.selection?.unselect(props.getIdValue(x))
										})
									}
								}}
							/>
						)}
						{props.columns.map((column) => {
							return (
								<div
									key={column.field}
									style={{
										maxWidth: column.width || "auto",
										minWidth: column.width || "auto",
										width: column.width || "auto",
									}}
									className={clsx(style.cell, getAlignClass(column.align))}
								>
									<div className={clsx(style.cellContent, style.headerContent)}>
										{column.header}
									</div>
									{rows.length > 0 && props.sort && column.sort && (
										<button
											className={clsx(
												style.sort,
												props.sort?.sort?.field === column.field &&
													(props.sort?.sort.direction === "asc"
														? style.sortAsc
														: style.sortDesc),
											)}
											onClick={() => {
												if (!props.sort?.setSort) return
												if (props.pagination) {
													props.pagination.firstPage()
												}
												props.sort?.setSort((x) => {
													return {
														field: column.field,
														direction:
															x?.direction === "asc" && column.field === x.field
																? "desc"
																: "asc",
													}
												})
											}}
										>
											<Icon icon="keyboard_arrow_up" className={style.desc} />
											<Icon icon="keyboard_arrow_down" className={style.asc} />
										</button>
									)}
								</div>
							)
						})}
					</header>
				)}
				{props.loading ? (
					<Skeleton
						height={`calc(${props.pagination?.pageSize || 10} * 50px + 2px)`}
						width="100%"
					>
						Carregando...
					</Skeleton>
				) : (
					<>
						{rows.map((row) => {
							return (
								<div
									className={style.row}
									key={props.getIdValue(row)}
									style={{
										gridTemplateColumns: columnsTemplate,
									}}
								>
									{props.selection && (
										<input
											type="checkbox"
											checked={(props.selection.selected || []).includes(
												props.getIdValue(row),
											)}
											onChange={(e) => {
												if (!e.target.checked) {
													props.selection?.unselect(props.getIdValue(row))
												} else {
													props.selection?.select(props.getIdValue(row))
												}
											}}
										/>
									)}
									{props.columns.map((column) => {
										const isFlexColumn = column.width?.includes("fr")
										let columnValue = column.render
											? column.render(row)
											: (row?.[
													column.field as unknown as keyof typeof row
												] as ReactNode)

										if (column.type === "domain" && column.domain) {
											columnValue =
												column.domain?.[
													row?.[
														column.field as unknown as keyof typeof row
													] as keyof typeof column.domain
												] || "--"
										}
										return (
											<div
												key={column.field}
												style={{
													maxWidth: isFlexColumn
														? "none"
														: column.width || "auto",
													minWidth: isFlexColumn
														? "none"
														: column.width || "auto",
													width: isFlexColumn ? "auto" : column.width || "auto",
												}}
												className={clsx(
													style.cell,
													getAlignClass(column.align),
												)}
											>
												<div className={style.cellContent}>{columnValue}</div>
											</div>
										)
									})}
								</div>
							)
						})}
						{rows.length === 0 && (
							<div className={style.row}>
								<div className={clsx(style.cell, style.noDataFound)}>
									<div className={style.cellContent}>
										{props.localization?.noRecordsFound ||
											"Nenhum registro encontrado"}
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{(props.selection?.selected || []).length > 0 && (
				<div className={style.pagination}>
					<Button.Secondary
						size="sm"
						leftIcon="close"
						onClick={() => {
							props.selection?.clear()
						}}
					>
						{props.localization?.clearSelection || "Limpar seleção"}
					</Button.Secondary>
					<p>{(props.selection?.selected || []).length} itens selecionados</p>
				</div>
			)}
			{props.pagination && (
				<Pagination
					{...props.pagination}
					disabled={props.loading}
					variant={props.paginationVariant || "default"}
				/>
			)}
		</div>
	)
}
