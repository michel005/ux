export const SizeList = ["sm", "md", "lg", "xl"] as const

export type SizeType = (typeof SizeList)[number]
