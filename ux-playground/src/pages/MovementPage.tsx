import { endOfMonth, formatISO, startOfMonth } from "date-fns"
import { createPortal } from "react-dom"
import { FormProvider, useForm } from "react-hook-form"
import { Button, Field, Flex, SimpleDropdownOptions } from "ux-library"

export function MovementPage() {
	const now = new Date()

	const form = useForm({
		defaultValues: {
			period: {
				start: formatISO(startOfMonth(now)).split("T")[0],
				end: formatISO(endOfMonth(now)).split("T")[0],
			},
		},
	})
	return (
		<FormProvider {...form}>
			{createPortal(
				<Flex.Row gap="1rem">
					<SimpleDropdownOptions
						position="br"
						options={[
							{
								icon: "shopping_cart",
								label: "Movimentaćão",
								onClick: () => {},
							},
							{
								icon: "transition_push",
								label: "Transferência",
								onClick: () => {},
							},
						]}
					>
						{({ alternate, open }) => (
							<Button.Primary
								leftIcon="add"
								// rightIcon={open ? "keyboard_arrow_up" : "keyboard_arrow_down"}
								onClick={() => {
									alternate()
								}}
							>
								Nova ...
							</Button.Primary>
						)}
					</SimpleDropdownOptions>
				</Flex.Row>,
				document.getElementById("headerButtonArea")!,
			)}
			<Flex.Row gap="1rem" align="bl">
				<Field.DateRange field="period" label="Período" />
				<Flex.Column grow={1}>
					<Field.Text
						field="search"
						label="Busca Geral"
						placeholder="Buscar por descrićão, categorias ou contas bancárias"
					/>
				</Flex.Column>
				<Button.Secondary leftIcon="search">Buscar</Button.Secondary>
			</Flex.Row>
		</FormProvider>
	)
}
