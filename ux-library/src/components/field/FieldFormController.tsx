import type { ReactElement } from "react"
import { Controller, useFormContext, type FieldValues } from "react-hook-form"
import type {
	FieldFormControllerType,
	UncontrolledField,
} from "@/components/field/FieldFormControllerType"

export type FieldFormControllerProps<
	T extends FieldValues,
	V,
> = FieldFormControllerType<T, V>

export function FieldFormController<T extends FieldValues, V>({
	DefaultComponent,
	...props
}: FieldFormControllerProps<T, V> & {
	DefaultComponent: (props: UncontrolledField<V>) => ReactElement
}) {
	const form = useFormContext<T>()

	if (props.field) {
		const {
			className,
			error,
			info,
			inputLeft,
			inputRight,
			label,
			optionalLabel,
			width,
			disabled,
		} = props
		const layoutProps = {
			className,
			error,
			info,
			inputLeft,
			inputRight,
			label,
			optionalLabel,
			width,
			disabled,
		}
		return (
			<Controller
				disabled={props.disabled}
				name={props.field}
				control={props.control || form.control}
				render={({ field, fieldState }) =>
					DefaultComponent({
						...layoutProps,
						disabled: field.disabled,
						value: field.value,
						onChange: field.onChange,
						error: fieldState.error?.message || error,
					})
				}
			/>
		)
	}

	return <>{DefaultComponent(props as UncontrolledField<V>)}</>
}
