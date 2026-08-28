import type { SizeType, VariantType } from "@/types"
import clsx from "clsx"
import type { MaterialSymbol } from "material-symbols"
import type { CSSProperties, ReactNode } from "react"
import { Icon } from "../icon/Icon"
import styles from "./Button.module.scss"

interface ButtonProps {
	active?: boolean
	align?: "left" | "center" | "right"
	className?: string
	children?: ReactNode
	disabled?: boolean
	leftIcon?: MaterialSymbol
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	rightIcon?: MaterialSymbol
	size?: SizeType
	style?: CSSProperties
	variant: VariantType
}

export function Button(props: ButtonProps) {
	return (
		<button
			type="button"
			className={clsx(
				styles.button,
				props.active && styles.active,
				styles[`variant_${props.variant}`],
				styles[`size_${props.size}`],
				styles[`align_${props.align || "center"}`],
				props.className,
			)}
			disabled={props.disabled}
			style={props.style}
			onClick={props.onClick}
		>
			{props.leftIcon && (
				<Icon size="1.25em" icon={props.leftIcon} className={styles.icon} />
			)}
			{props.children && (
				<span className={styles.content}>{props.children}</span>
			)}
			{props.rightIcon && (
				<Icon size="1.25em" icon={props.rightIcon} className={styles.icon} />
			)}
		</button>
	)
}

Button.Primary = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="primary" />
)
Button.Secondary = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="secondary" />
)
Button.Tertiary = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="tertiary" />
)
Button.Ghost = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="ghost" />
)
Button.Link = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="link" />
)
Button.Danger = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="danger" />
)
Button.Success = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="success" />
)
Button.Warning = (props: Omit<ButtonProps, "variant">) => (
	<Button {...props} variant="warning" />
)
