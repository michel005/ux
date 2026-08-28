import { type FieldValues } from "react-hook-form"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"
import style from "./SwitchField.module.scss"

export type SwitchFieldProps<T extends FieldValues> = FieldFormControllerType<
	T,
	boolean
>

export function SwitchField<T extends FieldValues>(props: SwitchFieldProps<T>) {
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
							className={style.switch}
							type="checkbox"
							disabled={compProps.disabled}
							checked={compProps.value ?? false}
							onChange={(event) => {
								compProps.onChange?.(event.target.checked)
								props.onChange?.(event.target.checked)
							}}
						/>
					}
				/>
			)}
		/>
	)
}
