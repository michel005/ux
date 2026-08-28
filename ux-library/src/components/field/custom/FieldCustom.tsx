import type { ReactNode } from "react"
import { type FieldValues } from "react-hook-form"
import { FieldFormController } from "../FieldFormController"
import type {
	FieldFormControllerType,
	UncontrolledField,
} from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"

export type FieldCustomProps<
	T extends FieldValues,
	V,
> = FieldFormControllerType<T, V> & {
	input: (props: UncontrolledField<V>) => ReactNode
}

export function FieldCustom<T extends FieldValues, V>(
	props: FieldCustomProps<T, V>,
) {
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => (
				<FieldLayout {...compProps} input={props.input(compProps)} />
			)}
		/>
	)
}
