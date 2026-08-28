import type { AbstractEntity } from "./AbstractEntity"
import type { BankAccountType } from "./BankAccountType"

export interface BankAccount extends AbstractEntity {
	name: string
	type: BankAccountType
	colorSchema: string
}
