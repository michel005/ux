import type { Control, FieldPath, FieldValues } from "react-hook-form"
import type { SharedFieldLayoutProps } from "@/components/field/layout/FieldLayout"
import type { ReactNode } from "react"

export interface ControlledField<
	T extends FieldValues,
	V,
> extends SharedFieldLayoutProps {
	field: FieldPath<T>
	control?: Control<T>
	value?: never
	onChange?: (value: V) => void
	info?: string
	error?: string
}

export interface UncontrolledField<T> extends SharedFieldLayoutProps {
	field?: never
	control?: never
	value: T
	onChange?: (value: T) => void
}

export type FieldFormControllerType<T extends FieldValues, V> = (
	ControlledField<T, V> | UncontrolledField<V>
) & {
	disabled?: boolean
	label?: string
	width?: string | number
	inputLeft?: ReactNode
	noPaddingLeft?: boolean
	inputRight?: ReactNode
	noPaddingRight?: boolean
}
