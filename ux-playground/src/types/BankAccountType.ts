import type { MaterialSymbol } from "material-symbols"

export const BankAccountTypeList = {
	CREDIT: "Crédito",
	DEBIT: "Débito",
	SALARY: "Salário",
	INVESTMENT: "Investimento",
	SAVINS: "Poupança",
} as const

export type BankAccountType = keyof typeof BankAccountTypeList

export const BankAccountTypeIcon: Record<BankAccountType, MaterialSymbol> = {
	CREDIT: "credit_card",
	DEBIT: "account_balance_wallet",
	SALARY: "attach_money",
	INVESTMENT: "trending_up",
	SAVINS: "savings",
} as const
