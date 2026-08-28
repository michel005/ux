import clsx from "clsx"
import type { MaterialSymbol } from "material-symbols"
import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { useRenderReady } from "../../hooks"
import { ModalStore } from "../../stores"
import type { SizeType } from "../../types"
import { Button } from "../button/Button"
import { Flex } from "../flex/Flex"
import { Icon } from "../icon/Icon"
import style from "./Modal.module.scss"

export interface ModalProps {
	id: string
	children: ReactNode
	icon?: MaterialSymbol
	header: string
	description?: string
	footer: ReactNode
	onClose?: () => boolean
	size?: SizeType
	wrapper?: (children: ReactNode) => ReactNode
}

export function Modal(props: ModalProps) {
	const renderReady = useRenderReady()
	const close = ModalStore((state) => state.modals[props.id]?.closing ?? false)

	const closeHandler = () => {
		ModalStore.getState().close(props.id)
	}
	if (!renderReady) return

	const Component = (
		<div
			className={clsx(style.modalBackground, close && style.close)}
			data-size={props.size || "md"}
			onClick={() => {
				closeHandler()
			}}
		>
			<div
				className={style.modal}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<header>
					{props.icon && (
						<Icon
							className={style.icon}
							color="#666"
							size="1.5rem"
							icon={props.icon}
						/>
					)}
					<Flex.Column gap="0.25rem" grow={1}>
						<h2>{props.header}</h2>
						{props.description && <p>{props.description}</p>}
					</Flex.Column>
					<Button.Tertiary
						leftIcon="close"
						onClick={() => {
							closeHandler()
						}}
					/>
				</header>
				<section>{props.children}</section>
				<footer>{props.footer}</footer>
			</div>
		</div>
	)

	return createPortal(
		props.wrapper ? props.wrapper(Component) : Component,
		document.body,
	)
}
