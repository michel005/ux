import { clsx } from "clsx"
import type { MaterialSymbol } from "material-symbols"
import { useState, type ReactNode } from "react"
import { type FieldValues } from "react-hook-form"
import { Button } from "../../button/Button"
import { DropdownOptions } from "../../dropdownOptions/DropdownOptions"
import { Flex } from "../../flex/Flex"
import { Tag } from "../../tag/Tag"
import { FieldFormController } from "../FieldFormController"
import type { FieldFormControllerType } from "../FieldFormControllerType"
import { FieldLayout } from "../layout/FieldLayout"
import style from "./FieldSelect.module.scss"

export type FieldSelectMultipleProps<T extends FieldValues> =
	FieldFormControllerType<T, string[]> & {
		placeholder?: string
		options: {
			value: string
			icon?: MaterialSymbol
			label: ReactNode
		}[]
	}

export function FieldSelectMultiple<T extends FieldValues>(
	props: FieldSelectMultipleProps<T>,
) {
	const [show, setShow] = useState(false)
	return (
		<FieldFormController
			{...props}
			DefaultComponent={(compProps) => {
				return (
					<FieldLayout
						{...compProps}
						className={style.fieldSelect}
						inputRight={
							<>
								{compProps.value && (
									<Button.Tertiary
										size="sm"
										leftIcon="add"
										className={style.clearButton}
										onClick={() => {
											setShow(true)
										}}
									/>
								)}
							</>
						}
						noPaddingRight
						input={
							<DropdownOptions
								show={show}
								setShow={setShow}
								position="bl"
								closeOnBackgroundClick
								content={
									<Flex.Column className={style.options}>
										{props.options.map((option) => {
											return (
												<Button
													variant={
														(compProps.value || []).includes(option.value)
															? "secondary"
															: "tertiary"
													}
													key={option.value}
													align="left"
													disabled={compProps.disabled}
													leftIcon={option.icon}
													onClick={() => {
														const current: string[] = compProps.value || []
														const val = current.includes(option.value)
															? current.filter((x) => x !== option.value)
															: [...current, option.value]

														compProps.onChange?.(val)
														props.onChange?.(val)
													}}
												>
													{option.label}
												</Button>
											)
										})}
									</Flex.Column>
								}
							>
								{(compProps.value || []).length > 0 && (
									<Flex.Row
										gap="0.25rem"
										wrap
										align="cl"
										className={style.multipleValues}
									>
										{(compProps.value || []).map((val) => {
											const option = props.options.find((x) => x.value === val)
											return (
												<Tag.Ghost key={val} icon={option?.icon} size="sm">
													{option?.label}
													{!compProps.disabled && (
														<Button.Link
															leftIcon="close"
															onClick={() => {
																const current: string[] = compProps.value || []
																const val2 = current.includes(val)
																	? current.filter((x) => x !== val)
																	: [...current, val]

																compProps.onChange?.(val2)
																props.onChange?.(val2)
																setShow(false)
															}}
														/>
													)}
												</Tag.Ghost>
											)
										})}
									</Flex.Row>
								)}

								{(compProps.value || []).length === 0 && (
									<Button.Ghost
										align="left"
										onClick={() => {
											setShow(true)
										}}
										className={clsx(style.inputButton, style.placeholder)}
									>
										{props.placeholder}
									</Button.Ghost>
								)}
							</DropdownOptions>
						}
					/>
				)
			}}
		/>
	)
}
