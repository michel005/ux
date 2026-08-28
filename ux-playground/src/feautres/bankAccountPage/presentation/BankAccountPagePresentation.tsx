import { Service } from "@/services"
import {
	BankAccountTypeIcon,
	BankAccountTypeList,
	type BankAccount,
	type BankAccountType,
} from "@/types"
import { createPortal } from "react-dom"
import { FormProvider } from "react-hook-form"
import {
	Button,
	Currency,
	Flex,
	ModalStore,
	SimpleDropdownOptions,
	Table,
	Tag,
	ToastStore,
	ToggleGroup,
	Tooltip,
	useMessage,
} from "ux-library"
import { useBankAccountForm } from "../hooks/useBankAccountForm"
import { useBankAccountListQuery } from "../hooks/useBankAccountListQuery"

export function BankAccountPagePresentation() {
	const message = useMessage()
	const form = useBankAccountForm()
	const { sort, query, pagination } = useBankAccountListQuery(
		form.watch("type"),
	)

	return (
		<FormProvider {...form}>
			{createPortal(
				<>
					<Tooltip content="Adicionar uma nova conta bancária" position="br">
						<Button.Primary
							leftIcon="add"
							onClick={() => {
								ModalStore.getState().open("bankAccount", {
									name: "Nova Conta",
								})
							}}
						>
							Nova Conta
						</Button.Primary>
					</Tooltip>
				</>,
				document.getElementById("headerButtonArea")!,
			)}
			<Flex.Row align="cc">
				<ToggleGroup
					currentOption={form.watch("type")}
					options={Object.entries({
						ALL: "Todas as Contas",
						...BankAccountTypeList,
					}).map(([key, value]) => ({
						label: value,
						value: key,
						icon:
							key === "ALL"
								? "account_balance_wallet"
								: BankAccountTypeIcon[key as BankAccountType],
					}))}
					onOptionChange={(option) => {
						form.setValue("type", option as BankAccountType)
					}}
				/>
			</Flex.Row>
			<Table<BankAccount, string>
				getIdValue={(row) => row.id}
				sort={sort}
				pagination={pagination}
				paginationVariant="compact"
				columns={[
					{
						sort: true,
						header: "Conta Bancária",
						field: "name",
						render: (row) => (
							<Flex.Row align="cl" gap="1rem">
								<Button.Link
									style={{ color: row.colorSchema }}
									onClick={() => {
										ModalStore.getState().open("bankAccount", row)
									}}
								>
									{row.name}
								</Button.Link>
								<Tag.Secondary size="sm" icon={BankAccountTypeIcon[row.type]}>
									{BankAccountTypeList[row.type]}
								</Tag.Secondary>
							</Flex.Row>
						),
						width: "400px",
					},
					{
						align: "right",
						header: "Saldo Atual",
						field: "currentAmount",
						render: () => <Currency moneySymbol="R$" value={0} />,
						width: "1fr",
					},
					{
						align: "right",
						header: "Saldo Futuro",
						field: "futureAmount",
						render: () => <Currency moneySymbol="R$" value={0} />,
						width: "200px",
					},
					{
						align: "right",
						field: "actions",
						render: (row) => (
							<SimpleDropdownOptions
								position="br"
								options={[
									{
										icon: "file_copy",
										label: "Duplicar",
										onClick: () => {
											console.log("Duplicar")
										},
									},
									{
										icon: "edit",
										label: "Editar",
										onClick: () => {
											ModalStore.getState().open("bankAccount", row)
										},
									},
									{
										icon: "delete",
										label: "Excluir",
										onClick: () => {
											message.openQuestion({
												header: "Exclusão de conta bancária",
												content:
													"Deseja realmente excluir esta conta bancária?",
												onConfirm: () => {
													Service.BankAccount.remove(row.id).then(() => {
														ToastStore.getState().openError({
															header: "Conta bancária excluída com sucesso",
															description:
																"Todos os dados relacionados a essa conta também foram excluídos.",
															icon: "delete",
														})
													})
												},
											})
										},
									},
								]}
							>
								{(x) => (
									<Button
										variant={!x.open ? "ghost" : "secondary"}
										leftIcon="more_horiz"
										onClick={() => {
											x.alternate()
										}}
									/>
								)}
							</SimpleDropdownOptions>
						),
						width: "100px",
					},
				]}
				rows={query.data?.rows || []}
			/>
		</FormProvider>
	)
}
