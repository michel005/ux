import { clsx } from "clsx"
import type { MaterialSymbol } from "material-symbols"
import { useState, type ReactNode } from "react"
import { type FieldValues } from "react-hook-form"
import type { PositionType } from "../../../types"
import { Button } from "../../button/Button"
import { DropdownOptions } from "../../dropdownOptions/DropdownOptions"
import { Flex } from "../../flex/Flex"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"
import style from "./FieldSelect.module.scss"

export type FieldSelectProps<T extends FieldValues> = FieldFormControllerType<
	T,
	string
> & {
	nullable?: boolean
	placeholder?: string
	position?: PositionType
	options: {
		value: string
		icon?: MaterialSymbol
		label: ReactNode
	}[]
}

export function FieldSelect<T extends FieldValues>(props: FieldSelectProps<T>) {
	const [show, setShow] = useState(false)
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => {
				const currentOption = props.options.find(
					(x) => x.value === compProps.value,
				)
				return (
					<FieldLayout
						{...compProps}
						className={style.fieldSelect}
						noPaddingRight
						input={
							<DropdownOptions
								show={show}
								setShow={setShow}
								position={props.position || "bl"}
								closeOnBackgroundClick
								content={
									<Flex.Column className={style.options}>
										{compProps.value && (props.nullable ?? true) && (
											<Button.Secondary
												align="left"
												leftIcon="close"
												className={style.clearButton}
												onClick={() => {
													compProps.onChange?.("")
													props.onChange?.("")
													setShow(false)
												}}
											>
												Limpar
											</Button.Secondary>
										)}
										{props.options.map((option) => {
											return (
												<Button.Tertiary
													key={option.value}
													align="left"
													disabled={compProps.disabled}
													active={compProps.value === option.value}
													leftIcon={option.icon}
													onClick={() => {
														compProps.onChange?.(option.value)
														props.onChange?.(option.value)
														setShow(false)
													}}
												>
													{option.label}
												</Button.Tertiary>
											)
										})}
									</Flex.Column>
								}
							>
								<Flex.Row align="cl">
									<Button.Tertiary
										align="left"
										disabled={compProps.disabled}
										className={clsx(
											style.inputButton,
											!compProps.value && style.placeholder,
										)}
										leftIcon={currentOption?.icon}
										rightIcon={
											show ? "keyboard_arrow_up" : "keyboard_arrow_down"
										}
										onClick={() => {
											setShow(true)
										}}
									>
										{currentOption?.label || props.placeholder}
									</Button.Tertiary>
								</Flex.Row>
							</DropdownOptions>
						}
					/>
				)
			}}
		/>
	)
}
