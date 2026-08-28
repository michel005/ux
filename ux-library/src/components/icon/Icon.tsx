import { clsx } from "clsx"
import type { MaterialSymbol } from "material-symbols"

export interface IconProps {
	color?: string
	icon: MaterialSymbol
	size?: number | string
	className?: string
	type?: "outlined" | "round" | "sharp"
}

export function Icon(props: IconProps) {
	return (
		<i
			className={clsx(
				`material-symbols-${props.type ?? "outlined"}`,
				props.className,
			)}
			style={{ fontSize: props.size ?? "1em", color: props.color ?? "inherit" }}
		>
			{props.icon}
		</i>
	)
}

Icon.Outlined = (props: Omit<IconProps, "type">) => (
	<Icon {...props} type="outlined" />
)
Icon.Round = (props: Omit<IconProps, "type">) => (
	<Icon {...props} type="round" />
)
Icon.Sharp = (props: Omit<IconProps, "type">) => (
	<Icon {...props} type="sharp" />
)
