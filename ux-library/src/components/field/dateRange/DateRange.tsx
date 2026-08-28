import { useRef } from "react"
import { type FieldValues } from "react-hook-form"
import { Flex } from "../../flex/Flex"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"
import style from "./DateRange.module.scss"

export type FieldDateRangeProps<T extends FieldValues> =
	FieldFormControllerType<T, { start: string; end: string }> & {
		placeholder?: string
	}

export function FieldDateRange<T extends FieldValues>(
	props: FieldDateRangeProps<T>,
) {
	const refEndDate = useRef<HTMLInputElement>(null)
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => (
				<FieldLayout
					{...compProps}
					input={
						<Flex.Row
							align="cl"
							gap="0.rem"
							className={style.dateRangeContainer}
						>
							<input
								type="date"
								className="input"
								disabled={compProps.disabled}
								placeholder={props.placeholder}
								value={compProps.value?.start || ""}
								max={compProps.value?.end}
								onChange={(e) => {
									compProps.onChange?.({
										start: e.target.value,
										end: compProps.value?.end,
									})
									props.onChange?.({
										start: e.target.value,
										end: compProps.value?.end,
									})
								}}
								onInput={() => {
									if (!compProps.value?.end) {
										refEndDate.current?.showPicker()
									}
								}}
							/>
							<input
								ref={refEndDate}
								type="date"
								className="input"
								disabled={compProps.disabled}
								placeholder={props.placeholder}
								value={compProps.value?.end || ""}
								min={compProps.value?.start}
								onChange={(e) => {
									compProps.onChange?.({
										start: compProps.value?.start,
										end: e.target.value,
									})
									props.onChange?.({
										start: compProps.value?.start,
										end: e.target.value,
									})
								}}
							/>
						</Flex.Row>
					}
				/>
			)}
		/>
	)
}
