import type { CSSProperties } from "react"
import clsx from "clsx"
import style from "./Currency.module.scss"

export interface CurrencyProps {
	moneySymbol?: string
	size?: string | number
	value: number
}

export function Currency(props: CurrencyProps) {
	return (
		<span
			className={clsx(
				style.currency,
				props.value > 0 && style.positive,
				props.value < 0 && style.negative,
			)}
			style={{ "--currency-font-size": props.size || "1em" } as CSSProperties}
		>
			{props.value < 0 && "-"}{" "}
			{props.moneySymbol && <span>{props.moneySymbol}</span>}
			{Math.abs(props.value).toFixed(2)}
		</span>
	)
}
