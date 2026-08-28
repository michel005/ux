import type { ReactNode } from "react"
import { formatFileSize } from "../../utils"
import { Button } from "../button/Button"
import { Flex } from "../flex/Flex"
import style from "./FileCard.module.scss"

export interface FileCardProps {
	variant: "file" | "folder"
	file?: File
	name?: string
	description?: string
	onClick?: () => void
	icon?: ReactNode
	options?: ReactNode
}

export function FileCard(props: FileCardProps) {
	return (
		<div className={style.fileCard} data-variant={props.variant}>
			<Flex.Column align="cc" className={style.icon}>
				{props.icon}
			</Flex.Column>
			<div className={style.fileDetails}>
				<Button.Link onClick={props.onClick}>
					{props?.name || props.file?.name}
				</Button.Link>
				<p>
					{props?.description ||
						(props.file?.size ? formatFileSize(props.file?.size) : "")}
				</p>
			</div>
			{props.options && <div className={style.options}>{props.options}</div>}
		</div>
	)
}

FileCard.File = (props: Omit<FileCardProps, "variant">) => (
	<FileCard variant="file" {...props} />
)
FileCard.Folder = (props: Omit<FileCardProps, "variant">) => (
	<FileCard variant="folder" {...props} />
)
