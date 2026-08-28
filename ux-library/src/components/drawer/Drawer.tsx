import clsx from "clsx"
import { type ReactNode } from "react"
import { createPortal } from "react-dom"
import { DrawerStore } from "../../stores"
import type { SizeType } from "../../types"
import { Button } from "../button/Button"
import style from "./Drawer.module.scss"

export interface DrawerProps {
	id: string
	children: ReactNode
	footer?: ReactNode
	header?: string
	onClose?: () => boolean
	size?: SizeType
	wrapper?: (children: ReactNode) => ReactNode
}

export function Drawer(props: DrawerProps) {
	const close = DrawerStore(
		(state) => state.drawers[props.id]?.closing ?? false,
	)

	const closeHandler = () => {
		DrawerStore.getState().close(props.id)
	}

	const Component = (
		<div
			data-size={props.size || "md"}
			className={clsx(style.drawerBackground, close && style.close)}
			onClick={() => {
				closeHandler()
			}}
		>
			<nav
				className={style.drawer}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<header className={style.header}>
					<h3>{props.header}</h3>
					<Button.Ghost
						leftIcon="close"
						onClick={() => {
							closeHandler()
						}}
					/>
				</header>
				<hr />
				<section className={style.content}>{props.children}</section>
				{props.footer && (
					<>
						<hr />
						<footer className={style.footer}>{props.footer}</footer>
					</>
				)}
			</nav>
		</div>
	)

	return createPortal(
		props.wrapper ? props.wrapper(Component) : Component,
		document.body,
	)
}
