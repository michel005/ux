import { FormProvider, useForm } from "react-hook-form"
import {
	Button,
	ColorSquare,
	Field,
	Flex,
	Grid,
	Modal,
	useMessage,
	type DrawerInstanceProps,
} from "ux-library"
import type { BankAccount } from "../../../types/BankAccount"
import {
	BankAccountTypeIcon,
	BankAccountTypeList,
} from "../../../types/BankAccountType"
import { SaveButton } from "../components/SaveButton"
import { Domains } from "@/constants/domains"

export function BankAccountPresentationForm(
	props: DrawerInstanceProps<BankAccount>,
) {
	const message = useMessage()
	const form = useForm<BankAccount>({
		defaultValues: props.data,
	})

	return (
		<Modal
			id={props.id}
			icon="description"
			header="Formulário de Conta Bancária"
			description="Preencha os dados da sua conta bancária"
			onClose={props.onClose}
			size="lg"
			footer={
				<Flex.Row align="cr" gap="1rem" grow={1}>
					<Field.Switch
						field="considerAmount"
						label="Considerar saldo na somatória total"
					/>
					<Flex.Space />
					{props.data?.id && (
						<Button.Tertiary
							leftIcon="delete"
							onClick={() => {
								message.openQuestion({
									header: "Exclusão de conta bancária",
									content:
										"Deseja realmente excluir esta conta bancária e todas as informações relacionadas a ela?",
								})
							}}
						>
							Excluir
						</Button.Tertiary>
					)}
					<SaveButton />
				</Flex.Row>
			}
			wrapper={(children) => <FormProvider {...form}>{children}</FormProvider>}
		>
			<Grid columns="1fr 1fr" gap="1rem">
				<Field.Text
					field="name"
					label="Nome da Conta"
					placeholder="Informe o nome da conta"
				/>
				<Field.Select
					field="type"
					label="Tipo"
					placeholder="Selecione o tipo de conta"
					options={Object.entries(BankAccountTypeList).map(([key, value]) => ({
						label: value,
						value: key,
						icon: BankAccountTypeIcon[key as keyof typeof BankAccountTypeIcon],
					}))}
				/>
			</Grid>
			<Grid columns="1fr 1fr" gap="1rem">
				<Field.Select
					field="colorSchema"
					label="Cor Padrão"
					placeholder="Selecione a cor da conta"
					options={Domains.ColorOptions.map((color) => ({
						label: (
							<Flex.Row align="cl" gap="0.5rem">
								<ColorSquare color={color.color} />
								{color.label}
							</Flex.Row>
						),
						value: color.color,
					}))}
				/>
				{!props.data?.id && (
					<Field.Currency
						field="initialAmount"
						label="Saldo Inicial"
						placeholder="0"
					/>
				)}
			</Grid>
		</Modal>
	)
}
