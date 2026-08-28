import { type FieldValues } from "react-hook-form"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"
import style from "./FieldCurrency.module.scss"
import { Flex } from "../../flex/Flex"

export type FieldCurrencyProps<T extends FieldValues> = FieldFormControllerType<
	T,
	string
> & {
	currencyUnit?: string
	placeholder?: string
}

export function FieldCurrency<T extends FieldValues>(
	props: FieldCurrencyProps<T>,
) {
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => (
				<FieldLayout
					{...compProps}
					noPaddingLeft
					inputLeft={
						<Flex.Row className={style.correncySymbol}>
							{props.currencyUnit || "R$"}
						</Flex.Row>
					}
					input={
						<input
							className={style.input}
							type="number"
							disabled={compProps.disabled}
							placeholder={props.placeholder}
							value={compProps.value}
							onChange={(e) => {
								compProps.onChange?.(e.target.value)
								props.onChange?.(e.target.value)
							}}
						/>
					}
				/>
			)}
		/>
	)
}
