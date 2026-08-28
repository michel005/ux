import type { PropsWithChildren } from "react"
import { Card, Flex } from "ux-library"
import styles from "./Modal.module.scss"
import { AppLogo } from "./AppLogo"

interface ModalProps extends PropsWithChildren {
	header: string
	description: string
}

export function Modal(props: ModalProps) {
	return (
		<div className={styles.modalContainer}>
			<Card className={styles.modalCard}>
				<div className={styles.outsideContent}>
					<Flex.Row align="cc">
						<AppLogo size={64} color="#fff9" />
					</Flex.Row>
					<h2>GerFinWEB</h2>
					<hr />
				</div>
				<header>
					<h2>{props.header}</h2>
					<p>{props.description}</p>
				</header>
				<Flex.Column gap="1rem">{props.children}</Flex.Column>
			</Card>
		</div>
	)
}
