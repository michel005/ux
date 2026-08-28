import type { ReactNode } from "react"
import type { ModalInstanceProps } from "../../stores"
import { Modal } from "../modal/Modal"

export function Message(
	props: ModalInstanceProps<{
		header: string
		content: ReactNode
		buttons: ReactNode
	}>,
) {
	return (
		<Modal
			id={props.id}
			header={props.data?.header || ""}
			footer={props.data?.buttons}
		>
			{props.data?.content}
		</Modal>
	)
}
