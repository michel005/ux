import type { HTMLInputTypeAttribute } from "react"
import { type FieldValues } from "react-hook-form"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"

export type FieldTextProps<T extends FieldValues> = FieldFormControllerType<
	T,
	string
> & {
	placeholder?: string
	onBlur?: () => void
	type?: HTMLInputTypeAttribute
}

export function FieldText<T extends FieldValues>(props: FieldTextProps<T>) {
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => (
				<FieldLayout
					{...compProps}
					input={
						<input
							type={props.type || "text"}
							disabled={compProps.disabled}
							placeholder={props.placeholder}
							value={compProps.value}
							onChange={(e) => {
								compProps.onChange?.(e.target.value)
								props.onChange?.(e.target.value)
							}}
							onBlur={props.onBlur}
						/>
					}
				/>
			)}
		/>
	)
}
