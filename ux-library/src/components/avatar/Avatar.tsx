import { getInitials } from "../../utils"
import { clsx } from "clsx"
import { useState, type CSSProperties } from "react"
import style from "./Avatar.module.scss"

export interface AvatarProps {
	className?: string
	imageUrl?: string
	name: string
	onClick?: () => void
	size?: number
	style?: CSSProperties
	variant: "square" | "circle"
}

export function Avatar(props: AvatarProps) {
	const [imageError, setImageError] = useState(false)

	const hasImage = Boolean(props.imageUrl) && !imageError
	const abbreviation = getInitials(props.name, 2)

	return (
		<div
			data-variant={props.variant}
			className={clsx(
				style.avatar,
				props.onClick && style.clickable,
				props.className,
			)}
			style={
				{
					"--avatar-size": `${props.size ?? 40}px`,
					...props.style,
				} as CSSProperties
			}
			aria-label={props.name}
			onClick={props.onClick}
		>
			{hasImage ? (
				<img
					className={style.image}
					src={props.imageUrl}
					alt={props.name}
					onError={() => setImageError(true)}
				/>
			) : (
				<span className={style.abbreviation}>{abbreviation}</span>
			)}
		</div>
	)
}

Avatar.Square = (props: Omit<AvatarProps, "variant">) => (
	<Avatar {...props} variant="square" />
)
Avatar.Circle = (props: Omit<AvatarProps, "variant">) => (
	<Avatar {...props} variant="circle" />
)
