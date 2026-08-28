import type { MaterialSymbol } from "material-symbols"
import type { ReactNode } from "react"
import type { SizeType, VariantType } from "../../types"
import { Icon } from "../icon/Icon"
import style from "./Tag.module.scss"

export interface TagProps {
	icon?: MaterialSymbol
	children?: ReactNode
	variant: VariantType | "ghost"
	size?: SizeType
}

export function Tag(props: TagProps) {
	return (
		<div
			className={style.tag}
			data-variant={props.variant}
			data-size={props.size || "md"}
		>
			{props.icon && <Icon icon={props.icon} />}
			{props.children && <span>{props.children}</span>}
		</div>
	)
}

Tag.Primary = (props: Omit<TagProps, "variant">) => (
	<Tag {...props} variant="primary" />
)
Tag.Secondary = (props: Omit<TagProps, "variant">) => (
	<Tag {...props} variant="secondary" />
)
Tag.Success = (props: Omit<TagProps, "variant">) => (
	<Tag {...props} variant="success" />
)
Tag.Warning = (props: Omit<TagProps, "variant">) => (
	<Tag {...props} variant="warning" />
)
Tag.Ghost = (props: Omit<TagProps, "variant">) => (
	<Tag {...props} variant="ghost" />
)
