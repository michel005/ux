import type { ReactNode } from "react"
import style from "./Skeleton.module.scss"

export interface SkeletonProps {
	variant?: "circle" | "rectangle"
	children?: ReactNode
	height?: string | number
	width?: string | number
}

export function Skeleton(props: SkeletonProps) {
	return (
		<div
			className={style.skeleton}
			style={{
				height: props.height || "100%",
				width: props.width || "100%",
			}}
		>
			{props.children}
		</div>
	)
}
