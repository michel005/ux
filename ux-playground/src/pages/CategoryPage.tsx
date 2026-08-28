import { createPortal } from "react-dom"
import { FormProvider, useForm } from "react-hook-form"
import { Button, Field, Flex, Tooltip } from "ux-library"

export function CategoryPage() {
	const form = useForm({
		defaultValues: {},
	})
	return (
		<FormProvider {...form}>
			{createPortal(
				<>
					<Tooltip content="Adicionar uma nova conta bancária" position="br">
						<Button.Primary leftIcon="add">Nova Categoria</Button.Primary>
					</Tooltip>
				</>,
				document.getElementById("headerButtonArea")!,
			)}
			<Flex.Row gap="1rem" align="bl">
				<Flex.Column grow={1}>
					<Field.Text
						field="search"
						label="Busca Geral"
						placeholder="Buscar por nome ou descrição"
					/>
				</Flex.Column>
				<Button.Secondary leftIcon="search">Buscar</Button.Secondary>
			</Flex.Row>
		</FormProvider>
	)
}
