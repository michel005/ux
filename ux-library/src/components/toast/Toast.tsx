import { useToastTimer } from "../../hooks"
import { ToastStore } from "../../stores"
import type { MaterialSymbol } from "material-symbols"
import { useEffect, type CSSProperties, type ReactNode } from "react"
import style from "./Toast.module.scss"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"

export interface ToastProps {
	id: string
	icon?: MaterialSymbol
	variant?: "primary" | "secondary" | "success" | "error"
	header?: ReactNode
	description?: ReactNode
	delay?: number
	persistent?: boolean
	onClose?: () => void
}

export function Toast(props: ToastProps) {
	const toastStore = ToastStore()
	const delay = props.delay || 30000

	const { isPaused, pause, resume } = useToastTimer(
		delay,
		props.persistent,
		() => {
			props.onClose?.()
			toastStore.close(props.id)
		},
	)

	useEffect(() => {
		if (toastStore.toasts.length > 5) {
			const list = [...toastStore.toasts]
			const toast = list.shift()
			toast?.onClose?.()
			toastStore.setToasts([...list])
		}
	}, [toastStore.toasts])

	return (
		<div
			className={style.toast}
			data-variant={props.variant || "primary"}
			onMouseEnter={() => {
				pause()
			}}
			onMouseLeave={() => {
				resume()
			}}
		>
			{props.icon && (
				<Icon
					icon={props.icon}
					size="2rem"
					color="#fff"
					className={style.icon}
				/>
			)}
			<div className={style.content}>
				{props.header && <b>{props.header}</b>}
				{props.description && <article>{props.description}</article>}
			</div>
			<Button.Ghost
				className={style.closeButton}
				leftIcon="close"
				onClick={() => {
					props.onClose?.()
					toastStore.close(props.id)
				}}
			/>

			{!props.persistent && (
				<div
					className={style.progressBar}
					style={
						{
							"--toast-delay": `${delay}ms`,
							animationPlayState: isPaused ? "paused" : "running",
						} as CSSProperties
					}
				/>
			)}
		</div>
	)
}

Toast.Primary = (props: Omit<ToastProps, "variant">) => (
	<Toast {...props} variant="primary" />
)
Toast.Secondary = (props: Omit<ToastProps, "variant">) => (
	<Toast {...props} variant="secondary" />
)
Toast.Error = (props: Omit<ToastProps, "variant">) => (
	<Toast {...props} variant="error" />
)
