import { ModalStore } from "../stores"
import type { ReactNode } from "react"
import { Button } from "../components"

export interface MessageProps {
	header: string
	content: ReactNode
	onConfirm?: () => void
	confirmLabel?: string
}

export interface QuestionProps {
	header: string
	content: ReactNode
	onConfirm?: () => void
	confirmLabel?: string
	onCancel?: () => void
	cancelLabel?: string
}

export interface OptionsProps {
	header: string
	content: ReactNode
	options: (props: { close: () => void }) => ReactNode
}

export function useMessage() {
	const modal = ModalStore()

	const openMessage = (props: MessageProps) => {
		modal.open("_message", {
			header: props.header,
			content: props.content,
			buttons: (
				<>
					<Button.Primary
						leftIcon="check"
						onClick={() => {
							props.onConfirm?.()
							modal.close("_message")
						}}
					>
						{props.confirmLabel || "Confirmar"}
					</Button.Primary>
				</>
			),
		})
	}

	const openQuestion = (props: QuestionProps) => {
		modal.open("_question", {
			header: props.header,
			content: props.content,
			buttons: (
				<>
					<Button.Tertiary
						leftIcon="close"
						onClick={() => {
							props.onCancel?.()
							modal.close("_question")
						}}
					>
						{props.cancelLabel || "Cancelar"}
					</Button.Tertiary>
					<Button.Primary
						leftIcon="check"
						onClick={() => {
							props.onConfirm?.()
							modal.close("_question")
						}}
					>
						{props.confirmLabel || "Confirmar"}
					</Button.Primary>
				</>
			),
		})
	}

	const openOptions = (props: OptionsProps) => {
		modal.open("_options", {
			header: props.header,
			content: props.content,
			buttons: props.options({
				close: () => {
					modal.close("_options")
				},
			}),
		})
	}

	return {
		openMessage,
		openQuestion,
		openOptions,
	}
}
