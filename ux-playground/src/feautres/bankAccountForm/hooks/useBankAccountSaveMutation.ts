import { useMutation } from "@tanstack/react-query"
import { useFormContext } from "react-hook-form"
import { ModalStore, ToastStore } from "ux-library"
import { Service } from "../../../services"
import type { BankAccount } from "../../../types/BankAccount"

export function useBankAccountSaveMutation() {
	const form = useFormContext<BankAccount>()

	return useMutation({
		mutationFn: async () => {
			const bankAccount = form.getValues()
			if (bankAccount.id) {
				await Service.BankAccount.update(bankAccount.id, bankAccount)
			} else {
				await Service.BankAccount.create(bankAccount)
			}
		},
		onSuccess: () => {
			const bankAccount = form.getValues()
			ModalStore.getState().close("bankAccount")
			if (bankAccount.id) {
				ToastStore.getState().openPrimary({
					icon: "save",
					header: "Conta bancária atualizada com sucesso",
					description: "Já é possivel visualizar suas alterações",
				})
			} else {
				ToastStore.getState().openSuccess({
					icon: "save",
					header: "Conta bancária cadastrada com sucesso",
					description: "Já é possivel visualizar sua nova conta",
				})
			}
		},
		onError: (e) => {
			const bankAccount = form.getValues()
			if (bankAccount.id) {
				ToastStore.getState().openError({
					icon: "warning",
					header: "Erro ao alterar conta bancária",
					description: e.message || "Erro desconhecido",
				})
			} else {
				ToastStore.getState().openError({
					icon: "warning",
					header: "Erro ao cadastrar conta bancária",
					description: e.message || "Erro desconhecido",
				})
			}
		},
	})
}
