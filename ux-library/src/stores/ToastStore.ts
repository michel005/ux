import type { ToastProps } from "@/components/toast/Toast"
import type { StoreApi } from "zustand"
import { create } from "zustand"

export interface ToastStoreProps {
	toasts: ToastProps[]
	setToasts: (toasts: ToastProps[]) => void
	openPrimary: (props: Omit<ToastProps, "variant" | "id">) => string
	openSecondary: (props: Omit<ToastProps, "variant" | "id">) => string
	openSuccess: (props: Omit<ToastProps, "variant" | "id">) => string
	openError: (props: Omit<ToastProps, "variant" | "id">) => string
	close: (id: string) => void
	clear: () => void
}

type Get<T> = StoreApi<T>["getState"]
type Set<T> = StoreApi<T>["setState"]

const open = (
	get: Get<ToastStoreProps>,
	set: Set<ToastStoreProps>,
	variant: ToastProps["variant"],
) => {
	return (props: Omit<ToastProps, "variant" | "id">) => {
		const old = get().toasts
		const id = String(Math.random())
		const next = [
			...old,
			{
				id,
				...props,
				variant,
			},
		]
		set({ toasts: next })
		return id
	}
}

export const ToastStore = create<ToastStoreProps>((set, get) => ({
	toasts: [],
	setToasts: (toasts) => set({ toasts }),
	openPrimary: open(get, set, "primary"),
	openSecondary: open(get, set, "secondary"),
	openSuccess: open(get, set, "success"),
	openError: open(get, set, "error"),
	close: (id: string) => {
		const old = get().toasts
		set({ toasts: old.filter((x) => x.id !== id) })
	},
	clear: () => {
		set({ toasts: [] })
	},
}))
