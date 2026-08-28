import { create } from "zustand"

const CLOSE_ANIMATION_DELAY_MS = 200
const closeTimeoutByKey = new Map<string, ReturnType<typeof setTimeout>>()

export interface ModalInstanceProps<T = string> {
	id: string
	data?: T
	onClose?: () => boolean
	closing?: boolean
}

export interface ModalStoreProps {
	modals: Record<string, ModalInstanceProps<any>>
	open: <T>(key: string, data?: T, onClose?: () => boolean) => void
	close: (key: string) => void
}

export const ModalStore = create<ModalStoreProps>((set, get) => ({
	modals: {},
	open: (key, data, onClose) => {
		const activeTimeout = closeTimeoutByKey.get(key)
		if (activeTimeout) {
			clearTimeout(activeTimeout)
			closeTimeoutByKey.delete(key)
		}

		set((state) => ({
			modals: {
				...state.modals,
				[key]: { id: key, data, onClose, closing: false },
			},
		}))
	},
	close: (key) => {
		const modal = get().modals[key]
		if (!modal || modal.closing) {
			return
		}

		if (!(modal.onClose?.() ?? true)) {
			return
		}

		set((state) => ({
			modals: {
				...state.modals,
				[key]: { ...modal, closing: true },
			},
		}))

		const activeTimeout = closeTimeoutByKey.get(key)
		if (activeTimeout) {
			clearTimeout(activeTimeout)
		}

		const closeTimeout = setTimeout(() => {
			set((state) => {
				const nextModal = state.modals[key]

				if (!nextModal?.closing) {
					return state
				}

				const newModals = { ...state.modals }
				delete newModals[key]
				return { modals: newModals }
			})
			closeTimeoutByKey.delete(key)
		}, CLOSE_ANIMATION_DELAY_MS)

		closeTimeoutByKey.set(key, closeTimeout)
	},
}))
