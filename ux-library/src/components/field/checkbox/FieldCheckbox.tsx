import { type FieldValues } from "react-hook-form"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"

export type FieldCheckboxProps<T extends FieldValues> = FieldFormControllerType<
	T,
	boolean
>

export function FieldCheckbox<T extends FieldValues>(
	props: FieldCheckboxProps<T>,
) {
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => (
				<FieldLayout
					{...compProps}
					label={props.label}
					labelFor={props.field}
					type="checkbox"
					input={
						<input
							id={props.field}
							type="checkbox"
							disabled={compProps.disabled}
							checked={compProps.value ?? false}
							onChange={(e) => {
								compProps.onChange?.(e.target.checked)
								props.onChange?.(e.target.checked)
							}}
						/>
					}
				/>
			)}
		/>
	)
}
