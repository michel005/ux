import { Button } from "../button/Button"
import { FieldSelect } from "../field/select/FieldSelect"
import { Flex } from "../flex/Flex"
import type {
	LocalPaginationProps,
	RemotePaginationProps,
} from "../table/Table"

export type PaginationProps<T> = (
	LocalPaginationProps<T> | RemotePaginationProps
) & {
	disabled?: boolean
	variant: "default" | "compact"
}

export function Pagination<T>(props: PaginationProps<T>) {
	return (
		<Flex.Row align="cc" gap="1rem" wrap>
			{props.variant === "default" && (
				<FieldSelect
					nullable={false}
					position="tl"
					options={(props?.pageSizeOptions || []).map((x) => ({
						label: <>{x} por página</>,
						value: String(x),
					}))}
					value={String(props.pageSize)}
					onChange={(value) => {
						props?.setPageSize(Number(value))
					}}
				/>
			)}
			<Flex.Row
				align={props.variant === "compact" ? "cc" : "cr"}
				gap="0.25rem"
				grow={1}
			>
				<Button.Secondary
					align="center"
					leftIcon="keyboard_double_arrow_left"
					disabled={props.disablePrevious || props.disabled}
					onClick={() => {
						props?.firstPage()
					}}
				/>
				<Button.Secondary
					align="center"
					leftIcon="keyboard_arrow_left"
					disabled={props.disablePrevious || props.disabled}
					onClick={() => {
						props?.previousPage()
					}}
				/>
				<Flex.Row padding="0 0.5rem">
					{props.currentPage} de {props.pageCount ?? 1}
				</Flex.Row>
				<Button.Secondary
					align="center"
					leftIcon="keyboard_arrow_right"
					disabled={props.disableNext || props.disabled}
					onClick={() => {
						props?.nextPage()
					}}
				/>
				<Button.Secondary
					align="center"
					leftIcon="keyboard_double_arrow_right"
					disabled={props.disableNext || props.disabled}
					onClick={() => {
						props?.lastPage()
					}}
				/>
			</Flex.Row>
		</Flex.Row>
	)
}
