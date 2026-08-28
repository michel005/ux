export const VariantList = [
	"primary",
	"secondary",
	"tertiary",
	"ghost",
	"link",
	"danger",
	"success",
	"warning",
] as const

export type VariantType = (typeof VariantList)[number]
