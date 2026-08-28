import type { MaterialSymbol } from "material-symbols"
import { useState, type ReactNode } from "react"
import type { PositionType } from "@/types"
import { DropdownOptions } from "./DropdownOptions"
import { Button } from "../button/Button"

export interface SimpleDropdownOptionsOptionProps {
	label: ReactNode
	icon?: MaterialSymbol
	disabled?: boolean
	onClick: () => void | boolean
}

export interface SimpleDropdownOptionsOptionWithSubOptionsProps extends Omit<
	SimpleDropdownOptionsOptionProps,
	"onClick"
> {
	position?: PositionType
	options: SimpleDropdownOptionsOptionProps[]
}

export interface SimpleDropdownOptionsProps {
	disabled?: boolean
	children?: (props: { alternate: () => void; open: boolean }) => ReactNode
	position?: PositionType
	options: (
		| SimpleDropdownOptionsOptionProps
		| SimpleDropdownOptionsOptionWithSubOptionsProps
		| "divider"
	)[]
	onSelect?: () => void
}

export function SimpleDropdownOptions(props: SimpleDropdownOptionsProps) {
	const [open, setOpen] = useState(false)

	return (
		<DropdownOptions
			show={open}
			setShow={setOpen}
			content={
				<>
					{props.options.map((option, optionIndex) => {
						if (option === "divider") {
							return <hr key={optionIndex} />
						}
						const optionSubOptionsType =
							option as SimpleDropdownOptionsOptionWithSubOptionsProps
						if (optionSubOptionsType?.options) {
							return (
								<SimpleDropdownOptions
									key={optionSubOptionsType.label?.toString()}
									disabled={option.disabled}
									options={optionSubOptionsType.options}
									position={optionSubOptionsType.position}
									onSelect={() => setOpen(false)}
								>
									{() => (
										<Button.Ghost
											size="sm"
											disabled={option.disabled}
											leftIcon={optionSubOptionsType.icon}
											onClick={() => {
												setOpen((x) => !x)
											}}
										>
											{optionSubOptionsType.label}
										</Button.Ghost>
									)}
								</SimpleDropdownOptions>
							)
						}
						const optionRegularType = option as SimpleDropdownOptionsOptionProps
						return (
							<Button.Tertiary
								key={optionIndex}
								align="left"
								disabled={option.disabled}
								leftIcon={optionRegularType.icon}
								onClick={() => {
									const result = optionRegularType.onClick()
									if (result ?? true) {
										props.onSelect?.()
										setOpen(false)
									}
								}}
							>
								{optionRegularType.label}
							</Button.Tertiary>
						)
					})}
				</>
			}
			position={props.position || "bl"}
		>
			{props.children?.({ alternate: () => setOpen((x) => !x), open })}
		</DropdownOptions>
	)
}
