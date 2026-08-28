import { clsx } from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import style from "./Card.module.scss"

export interface CardProps extends DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> {}

export function Card({ className, ...props }: CardProps) {
	return <div {...props} className={clsx(style.card, className)} />
}
