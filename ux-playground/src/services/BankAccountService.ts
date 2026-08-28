import type { BankAccountType } from "@/types"
import type { BankAccount } from "../types/BankAccount"
import type { PaginationType } from "@/types/PaginationType"
import { SortUtils } from "ux-library"
import { Domains } from "@/constants/domains"

const allRecords: BankAccount[] = [
	{
		id: "1",
		createdAt: new Date().toISOString(),
		name: "Banco do Brasil",
		type: "CREDIT",
		colorSchema: Domains.ColorOptions[0].color,
	},
	{
		id: "2",
		createdAt: new Date().toISOString(),
		name: "Itaú Unibanco",
		type: "SALARY",
		colorSchema: Domains.ColorOptions[1].color,
	},
	{
		id: "3",
		createdAt: new Date().toISOString(),
		name: "Caixa Econômica Federal",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[2].color,
	},
	{
		id: "4",
		createdAt: new Date().toISOString(),
		name: "Bradesco",
		type: "INVESTMENT",
		colorSchema: Domains.ColorOptions[3].color,
	},
	{
		id: "5",
		createdAt: new Date().toISOString(),
		name: "Santander Brasil",
		type: "SAVINS",
		colorSchema: Domains.ColorOptions[4].color,
	},
	{
		id: "6",
		createdAt: new Date().toISOString(),
		name: "Banco Inter",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[5].color,
	},
	{
		id: "7",
		createdAt: new Date().toISOString(),
		name: "Nubank",
		type: "CREDIT",
		colorSchema: Domains.ColorOptions[6].color,
	},
	{
		id: "8",
		createdAt: new Date().toISOString(),
		name: "BTG Pactual",
		type: "INVESTMENT",
		colorSchema: Domains.ColorOptions[7].color,
	},
	{
		id: "9",
		createdAt: new Date().toISOString(),
		name: "C6 Bank",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[8].color,
	},
	{
		id: "10",
		createdAt: new Date().toISOString(),
		name: "PicPay Bank",
		type: "SALARY",
		colorSchema: Domains.ColorOptions[9].color,
	},
	{
		id: "11",
		createdAt: new Date().toISOString(),
		name: "Banco PAN",
		type: "CREDIT",
		colorSchema: Domains.ColorOptions[10].color,
	},
	{
		id: "12",
		createdAt: new Date().toISOString(),
		name: "Safra",
		type: "INVESTMENT",
		colorSchema: Domains.ColorOptions[0].color,
	},
	{
		id: "13",
		createdAt: new Date().toISOString(),
		name: "Banco Original",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[1].color,
	},
	{
		id: "14",
		createdAt: new Date().toISOString(),
		name: "Neon",
		type: "SAVINS",
		colorSchema: Domains.ColorOptions[2].color,
	},
	{
		id: "15",
		createdAt: new Date().toISOString(),
		name: "Sicredi",
		type: "SALARY",
		colorSchema: Domains.ColorOptions[3].color,
	},
	{
		id: "16",
		createdAt: new Date().toISOString(),
		name: "Sicoob",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[4].color,
	},
	{
		id: "17",
		createdAt: new Date().toISOString(),
		name: "Banco Banrisul",
		type: "CREDIT",
		colorSchema: Domains.ColorOptions[5].color,
	},
	{
		id: "18",
		createdAt: new Date().toISOString(),
		name: "Banco BRB",
		type: "INVESTMENT",
		colorSchema: Domains.ColorOptions[6].color,
	},
	{
		id: "19",
		createdAt: new Date().toISOString(),
		name: "Banco Mercantil",
		type: "SAVINS",
		colorSchema: Domains.ColorOptions[7].color,
	},
	{
		id: "20",
		createdAt: new Date().toISOString(),
		name: "Banco Sofisa",
		type: "DEBIT",
		colorSchema: Domains.ColorOptions[8].color,
	},
]

export const BankAccountService = {
	create: async (bankAccount: BankAccount) => {},
	update: async (id: string, bankAccount: BankAccount) => {},
	remove: async (id: string) => {},
	getAll: async (props: {
		type: BankAccountType | null
		pagination: PaginationType
		sort: { field: string; direction: "asc" | "desc" }
	}) => {
		return {
			rows: allRecords
				.sort(
					SortUtils.sortString(
						props.sort.field as keyof BankAccount,
						props.sort.direction,
					),
				)
				.filter((x) => !props.type || x.type === props.type)
				.slice(
					(props.pagination.currentPage - 1) * props.pagination.pageSize,
					props.pagination.currentPage * props.pagination.pageSize,
				),
			totalRecords: allRecords.filter(
				(x) => !props.type || x.type === props.type,
			).length,
			currentPage: props.pagination.currentPage,
			pageSize: props.pagination.pageSize,
		}
	},
}
