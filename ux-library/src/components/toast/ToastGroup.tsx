import { ToastStore } from "../../stores"
import type { CSSProperties } from "react"
import { createPortal } from "react-dom"
import { Button } from "../button/Button"
import { Toast } from "./Toast"
import style from "./ToastGroup.module.scss"

export function ToastGroup() {
	const toastStore = ToastStore()

	return createPortal(
		<div className={style.toastGroup}>
			{toastStore.toasts.length > 1 && (
				<Button.Ghost
					leftIcon="clear_all"
					className={style.clearAllButton}
					onClick={() => {
						toastStore.clear()
					}}
				>
					Limpar Mensagens
				</Button.Ghost>
			)}
			<div className={style.toastList}>
				{toastStore.toasts.map((toast, toastIndex) => {
					return (
						<div
							key={toast.id}
							style={
								{
									"--toast-margin-top": `-${toastIndex === 0 ? 0 : toastIndex * 10 + (toastIndex - 1) * 8}px`,
									zIndex: toastStore.toasts.length + toastIndex,
								} as CSSProperties
							}
						>
							<Toast {...toast} />
						</div>
					)
				})}
			</div>
		</div>,
		document.body,
	)
}
