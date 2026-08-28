import clsx from "clsx"
import { useLayoutEffect, useRef, useState } from "react"
import type { MaterialSymbol } from "material-symbols"
import type { SizeType } from "../../types"
import { Flex } from "../flex/Flex"
import { Icon } from "../icon/Icon"
import style from "./ToggleGroup.module.scss"

export interface ToggleGroupOption {
	label: string
	value: string
	icon?: MaterialSymbol
}

export interface ToggleGroupProps {
	size?: SizeType
	currentOption: string
	options: ToggleGroupOption[]
	onOptionChange?: (option: string) => void
}

export function ToggleGroup(props: ToggleGroupProps) {
	const groupRef = useRef<HTMLDivElement>(null)
	const optionRefs = useRef<Record<string, HTMLButtonElement | null>>({})
	const [indicator, setIndicator] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		visible: false,
	})

	useLayoutEffect(() => {
		const group = groupRef.current
		const selectedOption = optionRefs.current[props.currentOption]
		if (!group || !selectedOption) return

		const updateIndicator = () => {
			setIndicator({
				x: selectedOption.offsetLeft,
				y: selectedOption.offsetTop,
				width: selectedOption.offsetWidth,
				height: selectedOption.offsetHeight,
				visible: true,
			})
		}

		updateIndicator()
		const observer = new ResizeObserver(updateIndicator)
		observer.observe(group)
		observer.observe(selectedOption)

		return () => observer.disconnect()
	}, [props.currentOption, props.options])

	return (
		<Flex.Row
			ref={groupRef}
			className={clsx(style.toggleGroup, style[`size_${props.size}`])}
			gap="0.5rem"
			wrap
		>
			<span
				aria-hidden="true"
				className={style.selectionIndicator}
				style={{
					height: indicator.height,
					opacity: indicator.visible ? 1 : 0,
					transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
					width: indicator.width,
				}}
			/>
			{props.options.map((option) => (
				<button
					key={option.value}
					ref={(element) => {
						optionRefs.current[option.value] = element
					}}
					className={clsx(
						style.option,
						style[`size_${props.size}`],
						option.value === props.currentOption && style.selected,
					)}
					onClick={() => props.onOptionChange?.(option.value)}
				>
					{option.icon && <Icon size="1.25em" icon={option.icon} />}
					{option.label}
				</button>
			))}
		</Flex.Row>
	)
}
