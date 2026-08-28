import type { ReactNode } from "react"
import { ModalStore, type ModalInstanceProps } from "../../stores"
import { Message } from "../message/Message"

export interface ModalManagerProps {
	modals: Record<string, (props: ModalInstanceProps<any>) => ReactNode>
}

export function ModalManager(props: ModalManagerProps) {
	const mappedModals = {
		...props.modals,
		_message: Message as (props: ModalInstanceProps<any>) => ReactNode,
		_question: Message as (props: ModalInstanceProps<any>) => ReactNode,
		_options: Message as (props: ModalInstanceProps<any>) => ReactNode,
	}
	const modalStore = ModalStore()

	return (
		<>
			{Object.entries(modalStore.modals).map(([key, value]) => {
				const Component = mappedModals[key as keyof typeof mappedModals]

				if (!Component) {
					return <></>
				}

				return <Component key={key} {...value} />
			})}
		</>
	)
}
