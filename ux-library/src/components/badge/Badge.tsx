import clsx from "clsx"
import type { MaterialSymbol } from "material-symbols"
import type { CSSProperties, ReactNode } from "react"
import style from "./Badge.module.scss"
import { Icon } from "../icon/Icon"

interface DefaultBadgeProps {
	children?: ReactNode
	color?: string
	enabled?: boolean
	position?: "tl" | "tr" | "bl" | "br" | "cl" | "cr"
}

interface BadgePropsDot extends DefaultBadgeProps {
	type: "dot"
}

interface BadgePropsContent extends DefaultBadgeProps {
	type: "content"
	content: string | number
}

interface BadgePropsIcon extends DefaultBadgeProps {
	type: "icon"
	content: MaterialSymbol
}

export type BadgeProps = BadgePropsDot | BadgePropsContent | BadgePropsIcon

export function Badge(props: BadgeProps) {
	if (!(props.enabled ?? true)) {
		return props.children
	}

	return (
		<div
			data-position={props.position || "tr"}
			data-type={props.type || "dot"}
			className={clsx(style.badgeContainer, !props.children && style.noContent)}
			style={{ "--badge-color": props.color } as CSSProperties}
		>
			{props.children}
			<div className={style.badge}>
				{props.type === "content" && !!props.content && (
					<span className={style.content}>{props.content}</span>
				)}
				{props.type === "icon" && !!props.content && (
					<Icon
						className={style.content}
						icon={props.content}
						color="#fff"
						size="1em"
					/>
				)}
			</div>
		</div>
	)
}

Badge.Dot = (props: Omit<BadgePropsDot, "type">) => (
	<Badge {...props} type="dot" />
)
Badge.Content = (props: Omit<BadgePropsContent, "type">) => (
	<Badge {...props} type="content" />
)
Badge.Icon = (props: Omit<BadgePropsIcon, "type">) => (
	<Badge {...props} type="icon" />
)
