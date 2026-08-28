import type { CSSProperties, ReactNode } from "react"
import style from "./Divider.module.scss"

export interface DividerProps {
	color?: string
	variant?: "horizontal" | "vertical"
	size?: string | number
	label?: ReactNode
	style?: CSSProperties
}

export function Divider(props: DividerProps) {
	return (
		<div
			data-variant={props.variant}
			className={style.divider}
			style={{ "--color": props.color, "--size": props.size, ...props.style } as CSSProperties}
		>
			{props.label && <span>{props.label}</span>}
		</div>
	)
}

Divider.Horizontal = (props: Omit<DividerProps, "variant">) => <Divider variant="horizontal" {...props} />
Divider.Vertical = (props: Omit<DividerProps, "variant">) => <Divider variant="vertical" {...props} />
