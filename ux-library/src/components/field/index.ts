import { FieldCheckbox } from "./checkbox/FieldCheckbox"
import { FieldCustom } from "./custom/FieldCustom"
import { FieldSelect } from "./select/FieldSelect"
import { FieldText } from "./text/FieldText"
import { FieldCurrency } from "./currency/FieldCurrency"
import { FieldSelectMultiple } from "./select/FieldSelectMultiple"
import { FieldDateRange } from "./dateRange/DateRange"
import { SwitchField } from "./switch/SwitchField"

export const Field = {
	Checkbox: FieldCheckbox,
	Currency: FieldCurrency,
	Custom: FieldCustom,
	DateRange: FieldDateRange,
	Select: FieldSelect,
	SelectMultiple: FieldSelectMultiple,
	Switch: SwitchField,
	Text: FieldText,
}
