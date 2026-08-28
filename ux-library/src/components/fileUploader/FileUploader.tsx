import { clsx } from "clsx"
import { useState } from "react"
import { selectFile } from "../../utils"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"
import style from "./FileUploader.module.scss"

const AcceptOptions = {
	"image/jpeg": "JPEG",
	"image/png": "PNG",
	"image/gif": "GIF",
	"image/webp": "WebP",
	"image/**": "JPEG, PNG, GIF, WebP",
	"application/pdf": "PDF",
	"application/msword": "Word (.doc)",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		"Word (.docx)",
	"application/vnd.ms-excel": "Excel (.xls)",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
		"Excel (.xlsx)",
	"text/plain": "Texto",
	"text/csv": "CSV",
} as const

export interface FileUploaderProps {
	onSelect: (files: File[]) => Promise<void>
	accept?: (keyof typeof AcceptOptions)[]
}

export function FileUploader(props: FileUploaderProps) {
	const [dragActive, setDragActive] = useState(false)

	const isValidDrag = (e: React.DragEvent<HTMLDivElement>) => {
		const isFile = e.dataTransfer.types.includes("Files")
		if (!isFile) return false

		if (props.accept && props.accept.length > 0) {
			const dragItems = Array.from(e.dataTransfer.items)

			return dragItems.some((item) => {
				return props.accept!.some((acceptedType) => {
					if (acceptedType === "image/**") {
						return item.type.startsWith("image/")
					}
					return item.type === acceptedType
				})
			})
		}

		return true
	}

	return (
		<div
			className={clsx(style.fileUploader, dragActive && style.dragActive)}
			onDragEnter={(e) => {
				e.preventDefault()
				e.stopPropagation()
				if (isValidDrag(e)) {
					setDragActive(true)
				}
			}}
			onDragOver={(e) => {
				e.preventDefault()
				e.stopPropagation()
				if (isValidDrag(e)) {
					setDragActive(true)
				} else {
					setDragActive(false)
				}
			}}
			onDragLeave={(e) => {
				e.preventDefault()
				e.stopPropagation()
				setDragActive(false)
			}}
			onDrop={(e) => {
				e.preventDefault()
				e.stopPropagation()
				setDragActive(false)

				if (isValidDrag(e)) {
					props.onSelect(Array.from(e.dataTransfer.files))
				}
			}}
		>
			<Icon icon="upload_file" size="3rem" className={style.icon} />
			<b>Selecione um arquivo ou arraste ele aqui</b>
			<div className={style.accepts}>
				{props.accept?.map((x) => AcceptOptions[x]).join(", ")}
			</div>
			<Button.Secondary
				className={style.browseFileButton}
				onClick={() => {
					selectFile(props.accept, true).then((value) => {
						if (value) {
							props.onSelect(value)
						}
					})
				}}
			>
				Buscar Arquivo
			</Button.Secondary>
		</div>
	)
}
